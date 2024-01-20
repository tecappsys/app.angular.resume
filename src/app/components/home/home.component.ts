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
  public jobTitle:any[]=[
    {key:'senior',value:'Senior'},
    {key:'sr',value:'Sr'},
    {key:'front_end',value:'Fron End'},
    {key:'front-end',value:'Fron-End'},    
    {key:'frontend',value:'FronEnd'},
    {key:'back_end',value:'Back End'},
    {key:'back-end',value:'Back-End'},    
    {key:'backend',value:'BackEnd'},
    {key:'developer',value:'Developer'},
  ]
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
    this.getSummaries();
    this.getSkills();
    this.getSkillsCategory();
    this.spinnerService.hideSpinner();
  }

  public drop(event: any) {
    moveItemInArray(this.jobTitleSelected, event.previousIndex, event.currentIndex);
  }

  public selectJobTitle(event:any,job:any){
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

  public selectSummary(event:any,summary:Summary){
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

  public sanitizeText(text:string){
    return text.replaceAll('<p>','').replaceAll('</p>','').replaceAll('<strong>','').replaceAll('</strong>','') 
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

  private addNewControl(summary:Summary){
      this.summaryForm = this.fb.group({
         ...this.summaryForm.controls,
         [summary._id]: [summary.summary]
      });
  }

  async export() {
    var converted = await asBlob(this.getDataCkeditor, {
      orientation: 'landscape',
      margins: { top: 720 },
    });
    saveAs(converted, 'test.docx');
  }

}
