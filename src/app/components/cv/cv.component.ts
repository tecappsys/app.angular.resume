import { Component, OnInit } from '@angular/core';
import { ResumeService } from '@src/app/core/resume.service';
import { SpinnerService } from '@src/app/core/spinner.service';
import { EntityTotals } from '@src/app/shared/interface/entity-totals.interface';
import { SkillCategory } from '@src/app/shared/interface/skill-category.interface';
import { Skill } from '@src/app/shared/interface/skill.interface';
import { Summary } from '@src/app/shared/interface/summary.interface';

import { asBlob } from 'html-docx-js-typescript';
// if you want to save the docx file, you need import 'file-saver'
// @ts-ignore
import { saveAs } from 'file-saver';
import { UUID } from 'angular2-uuid';
import { SkillCategoryGroupBy } from '@src/app/shared/interface/skill-category-group-by.interface';
import { Experience } from '@src/app/shared/interface/experience.interface';
import { LocalStorageService } from '@src/app/core/localstorage.service';
import { LOCAL_STORAGE_KEY } from '@src/app/shared/enums/local-storage-key.enum';
import { DateUtils } from '@src/app/shared/utils/date';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent  implements OnInit { 

  public summaries:Summary[]=[];
  public skillsCategoryGroupBySkill: any[] = [];
  public experiences:Experience[]=[]
  public experienceformsControl:any;

  public constructor( 
    private spinnerService:SpinnerService, 
    private resumeService:ResumeService,
    private localStoragaeService:LocalStorageService,
    private fb: UntypedFormBuilder
  ){
    this.spinnerService.showSpinner();
  }

  public ngOnInit(): void {
    this.getReques();
    this.spinnerService.hideSpinner();
  }

  public selectSummary(change:any,experience:Experience){
    const {event,summary} = change;
    if(event.checked){
      experience.summarySelected.push(summary)
    }else{
      experience.summarySelected = experience.summarySelected.filter( e => e !== summary )
    }
    this.setDataCkeditor(experience);
  }

  public addExperience(){
    const id = UUID.UUID();
    this.createNewExperienceForm(id);
    this.experiences.push(
      {
        id:id,
        summarySelected:[],
        dataCkeditor:'',
        show:this.experiences.length === 0,
        country:'',
        jobTitle:'',
        employer:'',
        startDate:'',
        endDate:''
      }
    )
    this.setLocalStorage();
  }

  private addExperienceForm(experience:Experience){
    this.experienceformsControl={
      ...this.experienceformsControl,
      [experience.id]:this.fb.group({
        jobTitle:[experience.jobTitle],
        employer:[experience.employer],
        present:[(experience.endDate === null)],
        country:[experience.country],
        startDate:[experience.startDate],
        endDate:[{value:experience.endDate === null, disabled: (experience.endDate === null)}],
        editor:[experience.dataCkeditor],
        show:[experience.show]
      })
    }
  }

  private createNewExperienceForm(id:string){
    this.experienceformsControl={
      ...this.experienceformsControl,
      [id]:this.fb.group({
        jobTitle:['Job title'],
        employer:['Employer name'],
        present:[false],
        country:[''],
        startDate:[''],
        endDate:[{value:'', disabled: false}],
        editor:[''],
        show:[false]
      })
    } 
  }

  public removeExperience(experience:Experience){
    this.experiences = this.experiences.filter(e => e.id != experience.id);
    this.setLocalStorage();
  }

  public onFormChange(id:string){
    for(let formsControl in this.experienceformsControl){
      if(formsControl !== id && this.experienceformsControl[id].get('show')?.value){
        this.experienceformsControl[formsControl].controls['show'].setValue(false)
      }
    }
    this.experiences = this.experiences.map( (experience:Experience)=>{
      if(experience.id === id){
        experience.jobTitle = this.experienceformsControl[id].get('jobTitle')?.value;
        experience.employer = this.experienceformsControl[id].get('employer')?.value;
        experience.country = this.experienceformsControl[id].get('country')?.value;
        experience.startDate = this.experienceformsControl[id].get('startDate')?.value;
        experience.endDate = this.experienceformsControl[id].get('present')?.value ? null : this.experienceformsControl[id].get('endDate')?.value;
        experience.dataCkeditor = this.experienceformsControl[id].get('editor')?.value;
        experience.show = this.experienceformsControl[id].get('show')?.value;
      }else if(this.experienceformsControl[id].get('show')?.value){
        experience.show = false;
      }
      return experience
    })
    
   this.setLocalStorage();
  }

  private getReques(){
    this.resumeService.getSummaries().subscribe( (response:EntityTotals<Summary>) =>{    
      if(response){
        this.getSkillsCategory(response.entity);
      }      
    })
  }

  private getSkillsCategory(summary:Summary[]){
    this.resumeService.getSkillsCategory().subscribe( (response:EntityTotals<SkillCategory>) =>{    
      if(response){
        this.skillCategoryGroupBySkill(response.entity,summary);
        this.getExperience();
      }      
    })
  }

  private skillCategoryGroupBySkill(skillsCategory:SkillCategory[],summary:Summary[]){
    this.skillsCategoryGroupBySkill = skillsCategory.reduce((acc:SkillCategoryGroupBy<Skill>[],items) => {
      const findAcc = acc.find( e => e.skill.key === items.skill);
      if(findAcc){
        findAcc.category = [...findAcc.category,{key:items.key,value:items.value, summary:this.getSummaryByCategory(items.key,summary)}];
      }else{
        acc.push({skill:{key:items.skill,value:items.skillValue},category:[{key:items.key,value:items.value, summary:this.getSummaryByCategory(items.key,summary)}]});
      }
      return acc;
    }, []);
  }

  private getSummaryByCategory(category:string,summary:Summary[]):Summary[]{
    return summary.reduce((acc:Summary[],item) => {
      if(item.category === category){
        acc.push(item)
      }
      return acc
    },[])
  }

  private getExperience(){
    this.localStoragaeService.getItem<Experience[]>(LOCAL_STORAGE_KEY.EXPERIENCE).subscribe( (response:Experience[]) =>{
      if(response){
        this.experiences = response;
        for(let experience of this.experiences){
          this.addExperienceForm(experience);
        }        
      }else{
        this.addExperience();
      }
    })
  }

  private setDataCkeditor(experience:Experience){
    let text = [];
    for(let summary of experience.summarySelected){
      text.push(`<li>${summary.summary}</li>`);
    }
    experience.dataCkeditor = `<ul>${text.join('')}</ul>`;
    this.experienceformsControl[experience.id].controls['editor'].setValue(experience.dataCkeditor)
  }

  private generateBlob(){
    const experiences = this.experiences.reduce((acc:string,item)=>{
      const title = this.formatTagSpan( item.jobTitle );
      const employer = this.formatTagSpan( item.employer );
      const country = this.formatTagSpan( item.country );
      const date = this.formatTagSpan( `${DateUtils.formatDate(item.startDate)} - ${item.endDate ? DateUtils.formatDate(item.endDate) : 'Present'}` );
      const summary = `${this.transformSummary(item.dataCkeditor)}`;
      return acc = `${acc} ${title} ${employer} ${country} ${date} ${summary} <br><br>`
    },'')
    return `${this.resumeService.getCabecera()} ${experiences} ${this.resumeService.getFooter()}`
  }

  private transformSummary(text:string){
    return text
    .replaceAll('<ul>','').replaceAll('</ul>','')
    .replaceAll('<li>',this.openSpan()).replaceAll('</li>','</span><br>')
    .replaceAll('<p>','').replaceAll('</p>','')
  }

  async export() {
    var converted = await asBlob(this.generateBlob(), {
      orientation: 'landscape',
      margins: { top: 720 },
    });
    saveAs(converted, 'test.docx');
  }

  private setLocalStorage(){
    this.localStoragaeService.setItem(LOCAL_STORAGE_KEY.EXPERIENCE,this.experiences)
  }

  private formatTagSpan(text:string){
    return `${this.openSpan()}${text}</span><br>`
  }

  private openSpan(){
    return '<span style="font-family: Arial; font-size:13px;font-weight: normal;">'
  }

}
