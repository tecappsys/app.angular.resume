import { Component, OnInit } from '@angular/core';
import { DialogService } from '@src/app/core/dialog.servic';
import { SpinnerService } from '@src/app/core/spinner.service';
import { Summary } from '@src/app/shared/interface/summary.interface';
import { SummaryDialogFormComponent } from './components/summary-dialog-form/summary-dialog-form.component';
import { ResumeService } from '@src/app/core/resume.service';
import { ACTION_TABLE_TYPE } from '@src/app/shared/enums/action-table-type.enum';
import { ActionTable } from '@src/app/shared/interface/action-table.interface';
import { EntityAction } from '@src/app/shared/interface/entity-action.interface';
import { Dialog } from '@src/app/shared/class/dialog';
import { EntityTotals } from '@src/app/shared/interface/entity-totals.interface';
import { FormBuilder } from '@angular/forms';

import { UUID } from 'angular2-uuid';
import { CompareList } from '@src/app/shared/interface/compare-list.interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  public displayedColumns:any ={
    summary:{
      title:'Summary',
      html:true,
      display: (element:Summary) =>element.summary
    },
    skill:{
      title:'Skill',
      display: (element:Summary) =>element.skill
    },
    category:{
      title:'Category',
      display: (element:Summary) =>element.category
    },
    actions:{}
  }

  public matSortColumn:string = 'summary';
  public summaries:Summary[]=[];
  public dataSummaries:Summary[]=[];
  public summaryForm:any;
  public dataRecursive:any[];


  public createActions = (row:Summary):ActionTable[]=>{
    const actionsTable:ActionTable[] = [
      {
        type:ACTION_TABLE_TYPE.EDIT_ACTION,
        title:'Edit'
      },
      {
        type:ACTION_TABLE_TYPE.DELETE_ACTION,
        title:'Delete'
      }
    ]
    return actionsTable
  }


  public constructor(
    private fb:FormBuilder,
    private spinnerService:SpinnerService,
    private dialogService:DialogService,
    private resumeService:ResumeService
  ){
    this.spinnerService.showSpinner();
  }

  public ngOnInit() {
    this.getSummaries()
    this.createForm()
  } 

  public getSummaries(){
    this.resumeService.getSummaries().subscribe( (response:EntityTotals<Summary>) =>{
      if(response){
        this.summaries = response.entity;
        this.dataSummaries = response.entity;      
        this.spinnerService.showSpinner();
      }            
      this.spinnerService.hideSpinner();
    })
  }

  public newSummary(){
    const dialogRef = this.dialogService.openDialog(SummaryDialogFormComponent)
    dialogRef.afterClosed().subscribe((response)=>{
      if(response){
        this.getSummaries()
      }
    })
  }

  public editSummary(summary:Summary){
    const diaogData:Dialog<Summary> = new Dialog<Summary>(summary);
    const dialogRef = this.dialogService.openDialog(SummaryDialogFormComponent,diaogData)
    dialogRef.afterClosed().subscribe((response)=>{
      if(response){
        this.getSummaries()
      }
    })
  }

  public deleteSummary(summary:Summary){
    this.spinnerService.showSpinner();
    this.resumeService.deleteSummaries({id:summary._id}).subscribe( (response) =>{    
      this.getSummaries()
      this.spinnerService.hideSpinner();
    })
  }

  public onValueChange(change:EntityAction<Summary>){
    switch (change.action.type) {
      case ACTION_TABLE_TYPE.EDIT_ACTION:
        this.editSummary(change.entity);
        break;
      case ACTION_TABLE_TYPE.DELETE_ACTION:
        this.deleteSummary(change.entity)
        break;
    
      default:
        break;
    }
  }

  public onSearch(){
    let searchConicidences = this.searchConicidences([this.summaryForm.get('search')?.value],this.dataSummaries);
    const bestConicidences = searchConicidences.reduce((acc:Summary[],item:CompareList)=>{
      const best = item.summary.reduce((accBest:Summary[],bestItem:Summary)=>{
        if(bestItem.coincidences && bestItem.coincidences.length > this.summaryForm.get('appears')?.value){
          accBest.push(bestItem)
        }
        return accBest
      },[]);
      acc = [...acc,...best]
      return acc;
    },[])
    this.summaries = bestConicidences;
  }

  private createForm(){
    this.summaryForm = this.fb.group({
      search:[''],
      appears:[1]
    })
  }
  
  public searchConicidences(
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

  public addCoincidence(results:CompareList[],data:string,coincidence:string,skill:Summary){
    const find = results.findIndex( e => e.value === data);
    if(find < 0){
      results.push( { value:data, summary:[{ ...skill,coincidences:[coincidence] }]} )
    }else{
      results = results.map( e =>{
          const find = e.summary.findIndex( x => x.summary === skill.summary);
          if(find < 0){
            e.summary.push({...skill,coincidences:[coincidence]})
          }else{
            e.summary = e.summary.map( i =>{
              if(i.summary === skill.summary){                
                const find = i.coincidences?.findIndex( (q:string) => q === coincidence);
                if(find && find < 0){
                  i.coincidences?.push(coincidence);
                }                
              }
              return i
            })
          }        
        return e
      });
    }
    return results 
  }
  
}
