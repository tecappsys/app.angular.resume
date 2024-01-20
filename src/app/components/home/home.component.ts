import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ResumeService } from '@src/app/core/resume.service';
import { SpinnerService } from '@src/app/core/spinner.service';
import { EntityTotals } from '@src/app/shared/interface/entity-totals.interface';
import { SkillCategory } from '@src/app/shared/interface/skill-category.interface';
import { Skill } from '@src/app/shared/interface/skill.interface';
import { Summary } from '@src/app/shared/interface/summary.interface';
import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

import { asBlob } from 'html-docx-js-typescript';
// if you want to save the docx file, you need import 'file-saver'
// @ts-ignore
import { saveAs } from 'file-saver';
import { JobTitle } from '@src/app/shared/interface/job-title.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 
  public ckeditor = ClassicEditor;
  public summaryForm: UntypedFormGroup;
  public dataCkeditor:string;
  public summary_selected:any[]=[];
  public panelOpenState = false;
  public summaries:Summary[]=[];
  public skills:Skill[]=[];
  public skillsCategory:SkillCategory[]=[];
  public skillsCategoryGroupBySkill: any[] = [];
  public getDataCkeditor:string;
  public jobTitles:any[]=[]
  public jobTitleSelected:any[]=[]

  public constructor( 
    private spinnerService:SpinnerService, 
    private resumeService:ResumeService, 
    private fb:UntypedFormBuilder
  ){
    this.spinnerService.showSpinner();
  }

  public ngOnInit(): void {
    this.createForm();  
    this.getReques();
    this.spinnerService.hideSpinner();
  }

  public getReques(){
    this.getSummaries();
    this.getSkills();
    this.getSkillsCategory();
    this.getJobTitle();
  }

  public selectJobTitle(change:any){
    const {event,job} = change;
    if(event.checked){
      this.jobTitleSelected.push(job)
    }else{
      this.jobTitleSelected = this.jobTitleSelected.filter( e => e !== job )
    }
  }

  public getSummaryByCategory(category:string){
    return this.summaries.reduce((acc:any[],item) => {
      if(item.category == category){
        acc.push(item)
      }
      return acc
    },[])
  }

  public selectSummary(change:any){
    const {event,summary} = change;
    if(event.checked){
      this.summary_selected.push(summary)
    }else{
      this.summary_selected = this.summary_selected.filter( e => e !== summary )
    }
    this.setDataCkeditor();
  }

  public onChange( {editor}: ChangeEvent ) {
    this.getDataCkeditor = editor.data.get();
  }

  private getSummaries(){
    this.resumeService.getSummaries().subscribe( (response:EntityTotals<Summary>) =>{    
      if(response){
        this.summaries = response.entity;
      }      
    })
  }

  private getSkills(){
    this.resumeService.getSkills().subscribe( (response:EntityTotals<Skill>) =>{    
      if(response){
        this.skills = response.entity;
      }      
    })
  }

  private getSkillsCategory(){
    this.resumeService.getSkillsCategory().subscribe( (response:EntityTotals<SkillCategory>) =>{    
      if(response){
        this.skillsCategory = response.entity;
        this.skillCategoryGroupBySkill()
      }      
    })
  }

  private skillCategoryGroupBySkill(){
    this.skillsCategoryGroupBySkill = this.skillsCategory.reduce((acc:any[],items) => {
      const findAcc = acc.find( e => e.key === items.skill);
      if(findAcc){
        findAcc.category = [...findAcc.category,{key:items.key,value:items.value}];
      }else{
        acc.push({key:items.skill,value:items.skillValue,category:[{key:items.key,value:items.value}]});
      }
      return acc;
    }, []);
  }

  private getJobTitle(){
    this.resumeService.getJobTitles().subscribe( (response:EntityTotals<JobTitle>) =>{    
      if(response){
        this.jobTitles = response.entity;
      }      
    })
  }

  private createForm(){
    this.summaryForm = this.fb.group({});
  }

  private setDataCkeditor(){
    let text = [];
    for(let summary of this.summary_selected){
      text.push(`<li>${summary.summary}</li>`);
    }
    this.dataCkeditor = `<ul>${text.join()}</ul>`;
  }

  async export() {
    var converted = await asBlob(this.getDataCkeditor, {
      orientation: 'landscape',
      margins: { top: 720 },
    });
    saveAs(converted, 'test.docx');
  }

}
