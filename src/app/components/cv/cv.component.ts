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
import { SkillCategoryGroupBy } from '@src/app/shared/interface/skill-category-group-by.interface';
import { Experience } from '@src/app/shared/interface/experience.interface';
import { LocalStorageService } from '@src/app/core/localstorage.service';
import { LOCAL_STORAGE_KEY } from '@src/app/shared/enums/local-storage-key.enum';
import { DateUtils } from '@src/app/shared/utils/date';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent  implements OnInit { 

  public summaries:Summary[]=[];
  public skillsCategoryGroupBySkill: any[] = [];
  public experiences:Experience[]=[]
  public experienceformControl:any;
  public experienceSelected:string;
  public URL_MULTIPLE_ADD_SUMMARY:string = '/multiple-add-summary'

  public constructor( 
    private router:Router,
    private spinnerService:SpinnerService, 
    private resumeService:ResumeService,
    private localStoragaeService:LocalStorageService,
    private fb: UntypedFormBuilder,
  ){
    this.spinnerService.showSpinner();
  }

  public ngOnInit(): void {
    this.createExperienceformControl();
    this.getReques();
    this.spinnerService.hideSpinner();
  }

  public addSummary(){
    this.router.navigate( [`${this.URL_MULTIPLE_ADD_SUMMARY}`] );
  }

  public removeExperience(experience:Experience){
    this.experiences = this.experiences.filter(e => e._id != experience._id);
    this.setLocalStorage();
  }

  public emptySummaries(){
    this.spinnerService.showSpinner();
    this.resumeService.putExperienceEmptySummary().subscribe( (response:EntityTotals<Summary>) =>{    
      this.spinnerService.hideSpinner(); 
    })
  }

  public onFormChange(id:string){
  //   for(let formsControl in this.experienceformControl){
  //     if(formsControl !== id && this.experienceformControl[id].get('show')?.value){
  //       this.experienceformControl[formsControl].controls['show'].setValue(false)
  //     }
  //   }
  //   this.experiences = this.experiences.map( (experience:Experience)=>{
  //     if(experience.id === id){
  //       experience.jobTitle = this.experienceformControl[id].get('jobTitle')?.value;
  //       experience.employer = this.experienceformControl[id].get('employer')?.value;
  //       experience.country = this.experienceformControl[id].get('country')?.value;
  //       experience.startDate = this.experienceformControl[id].get('startDate')?.value;
  //       experience.endDate = this.experienceformControl[id].get('present')?.value ? null : this.experienceformControl[id].get('endDate')?.value;
  //     }
  //     return experience
  //   })
    
  //  this.setLocalStorage();
  }

  public onExperienceSelect(experience:Experience){
    this.experienceSelected = experience._id
    this.addExperienceForm(experience)
  }

  public addExperience(){
    
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
    this.resumeService.getExperiences().subscribe( (response:EntityTotals<Experience>) =>{
      if(response){
        this.experiences = response.entity;       
      }
    })
  }

  private setDataCkeditor(experience:Experience){
    // let text = [];
    // for(let summary of experience.summarySelected){
    //   text.push(`<li>${summary.summary}</li>`);
    // }
    // experience.dataCkeditor = `<ul>${text.join('')}</ul>`;
    // this.experienceformControl[experience.id].controls['editor'].setValue(experience.dataCkeditor)
  }

  private generateBlob(){
    const experiences = this.experiences.reduce((acc:string,item)=>{
      const title = this.formatTagSpan( item.jobTitle );
      const employer = this.formatTagSpan( item.employer );
      const country = this.formatTagSpan( item.country );
      const date = this.formatTagSpan( `${DateUtils.formatDate(item.startDate)} - ${item.endDate ? DateUtils.formatDate(item.endDate) : 'Present'}` );
      const summary = `${this.transformSummary('')}`;
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

  private createExperienceformControl(){
    this.experienceformControl= this.fb.group({
      jobTitle:[''],
      employer:[''],
      present:[false],
      country:[''],
      startDate:[''],
      endDate:[{value:'', disabled: false}],
      summary:['']
    })
  }

  private addExperienceForm(experience:Experience){
    this.experienceformControl.controls['jobTitle'].setValue(experience.jobTitle);
    this.experienceformControl.controls['employer'].setValue(experience.employer);
    this.experienceformControl.controls['present'].setValue( (experience.endDate === null) );
    this.experienceformControl.controls['country'].setValue(experience.country);
    this.experienceformControl.controls['startDate'].setValue(experience.startDate);
    this.experienceformControl.controls['endDate'].setValue(experience.endDate);
    this.experienceformControl.controls['summary'].setValue(experience.summary);
  }

}
