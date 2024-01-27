import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ResumeService } from '@src/app/core/resume.service';
import { SpinnerService } from '@src/app/core/spinner.service';
import { CompareList } from '@src/app/shared/interface/compare-list.interface';
import { EntityAction } from '@src/app/shared/interface/entity-action.interface';
import { EntityTotals } from '@src/app/shared/interface/entity-totals.interface';
import { Experience } from '@src/app/shared/interface/experience.interface';
import { Summary } from '@src/app/shared/interface/summary.interface';

@Component({
  selector: 'app-cv-multiple-add-summary',
  templateUrl: './cv-multiple-add-summary.component.html',
  styleUrls: ['./cv-multiple-add-summary.component.scss']
})
export class CvMultipleAddSummaryComponent  implements OnInit {

  public displayedColumns:any ={
    summary:{
      title:'Summary',
      html:true,
      display: (element:Summary) =>element.summary
    },
    coincidences:{
      title:'Coincidences',
      display: (element:Summary) =>{
        return element?.coincidences ? element?.coincidences.join(' , ') : '';
      }
    },
    coincidences_length:{
      title:'Amount',
      display: (element:Summary) =>{
        return element?.coincidences ? element?.coincidences.length : 0;
      }
    },
    checkbox:{}
  }

  public matSortColumn:string = 'summary';
  public summaries:Summary[]=[];
  public dataSummaries:Summary[]=[];
  public summaryForm:any;
  public experienceForm:any;
  public dataRecursive:any[];
  public experiences:Experience[];
  public summarySelected:Summary[]=[];

  public constructor(
    private fb:FormBuilder,
    private spinnerService:SpinnerService,
    private resumeService:ResumeService,    
  ){
    
  }

  public ngOnInit() {
    this.createForm();   
    this.getSummaries();
  } 

  public get disabledSearch(){
    return this.summaryForm.get('search')?.value === '';
  }

  public onSaveSummaries(){
    const dataSaveSummaries = [];
    for(let experience of this.experiences){
      const summary = this.getSummaryById( this.experienceForm.get( experience._id )?.value );
      if(summary){
        dataSaveSummaries.push({experience,summary})
      }
    }
    this.spinnerService.showSpinner();
    this.saveSummaries(dataSaveSummaries)
  }

  public saveSummaries(data:any[]){
    if(data.length === 0){
      this.spinnerService.hideSpinner();
      this.clearData()
    }else{
      const param = {
        id:data[data.length-1].experience._id,
        summary:data[data.length-1].summary
      }
      this.resumeService.putExperienceAddSummary(param).subscribe((response:any)=>{
        data.pop()
        this.saveSummaries(data)
      })
    }
  }

  public getSummaryById(id:string){
    return this.summaries.find( e => e._id === id);
  }

  public getStatus(experience:Experience){
    const summaryId = this.experienceForm.get( experience._id )?.value;
    let findSummary = experience.summary.find(e=> e._id === summaryId);
    return findSummary ? 'home' : '';
  }

  public getSummaries(){
    this.resumeService.getSummaries().subscribe( (response:EntityTotals<Summary>) =>{
      if(response){
        this.summaries = response.entity;
        this.dataSummaries = response.entity; 
        this.getExperience()
      }            
      this.spinnerService.hideSpinner();
    })
  }

  public onAutomaticLoad(){
    const summarySelectedLength = this.summarySelected.length - 1;
    let summarySelectedIndex = -1;
    for(let experience of this.experiences){
      summarySelectedIndex= summarySelectedIndex < summarySelectedLength ? summarySelectedIndex+1 : 0;
      this.experienceForm.controls[ experience._id ].setValue( this.summarySelected[summarySelectedIndex]._id )
    }
  }

  public setExperienceForm(){
    for(let experience of this.experiences){
      this.experienceForm.addControl(experience._id, new FormControl(['']));
    }
  }

  public onValueChange(change:EntityAction<Summary>){
    if(change.action){
      if(this.summarySelected.length < this.experiences.length){
        this.summarySelected.push(change.entity);
      }
    }else{
      this.summarySelected = this.summarySelected.filter( e => e._id !== change.entity._id)
    }
  }

  public onSearch(){
    const search = this.summaryForm.get('search')?.value;
    if(search !== ''){
      let searchConicidences = this.searchConicidences([this.summaryForm.get('search')?.value],this.dataSummaries);
      const bestConicidences = searchConicidences.reduce((acc:Summary[],item:CompareList)=>{
        const best = item.summary.reduce((accBest:Summary[],bestItem:Summary)=>{
          if(bestItem.coincidences && bestItem.coincidences.length >= this.summaryForm.get('appears')?.value){
            accBest.push(bestItem)
          }
          return accBest
        },[]);
        acc = [...acc,...best]
        return acc;
      },[])
      this.summaries = bestConicidences.sort((a, b) => {
        const nameA = a.coincidences_count; 
        const nameB = b.coincidences_count;
        if (nameA && nameB && nameA < nameB) return 1;      
        if (nameA && nameB && nameA > nameB) return -1;
        return 0;
      });
    }
  }

  private getExperience(){
    this.resumeService.getExperiences().subscribe( (response:EntityTotals<Experience>) =>{
      if(response){
        this.experiences = response.entity; 
        this.setExperienceForm()    
      }else{
      }
    })
  }

  private createForm(){
    this.experienceForm = this.fb.group({});
    this.summaryForm = this.fb.group({
      search:[''],
      appears:[1]
    })
  }

  private searchConicidences(
    data:string[],    
    summaries:Summary[],
    results:CompareList[]=[]
  ){
    this.spinnerService.showSpinner()
    for(let dataIteration=0; dataIteration < data.length; dataIteration++){
      for(let skillIteration=0; skillIteration < summaries.length; skillIteration++){
        for(let compareIteration=0; compareIteration < data[dataIteration].split(' ').length; compareIteration++){
          const text = data[dataIteration].split(' ')[compareIteration]
          const skill = summaries[skillIteration].summary
          const coincidence = skill.includes(text);
          if (coincidence && data[dataIteration] !== summaries[skillIteration].summary){  
            results = this.addCoincidence(results,data[dataIteration],text,summaries[skillIteration]);     
          }
        }
      }
    }
    this.spinnerService.hideSpinner()
    return results;
  }

  private addCoincidence(results:CompareList[],data:string,coincidence:string,skill:Summary){
    const find = results.findIndex( e => e.value === data);
    if(find < 0){
      results.push( { value:data, summary:[{ ...skill,coincidences:[coincidence],coincidences_count:1 }]} )
    }else{
      results = results.map( e =>{
          const find = e.summary.findIndex( x => x.summary === skill.summary);
          if(find < 0){
            e.summary.push({...skill,coincidences:[coincidence],coincidences_count:1})
          }else{
            e.summary = e.summary.map( i =>{
              if(i.summary === skill.summary){                
                const find = i.coincidences?.findIndex( (q:string) => q === coincidence);
                if(find && find < 0){
                  i.coincidences?.push(coincidence);
                } 
                i.coincidences_count = i.coincidences?.length              
              }
              return i
            })
          }        
        return e
      });
    }
    return results 
  }

  private clearData(){
    this.summaries = this.dataSummaries;
    this.summarySelected = [];
    this.summaryForm.controls['search'].setValue('');
    this.summaryForm.controls['appears'].setValue('1');
    for(let experience of this.experiences){
      this.experienceForm.controls[ experience._id ].setValue('')
    }
  }
  
}