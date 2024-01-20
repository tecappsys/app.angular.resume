import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResumeService } from '@src/app/core/resume.service';
import { SpinnerService } from '@src/app/core/spinner.service';
import { Dialog } from '@src/app/shared/class/dialog';
import { EntityTotals } from '@src/app/shared/interface/entity-totals.interface';
import { SkillCategory } from '@src/app/shared/interface/skill-category.interface';
import { Skill } from '@src/app/shared/interface/skill.interface';
import { Summary } from '@src/app/shared/interface/summary.interface';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
@Component({
  selector: 'app-summary-dialog-form',
  templateUrl: './summary-dialog-form.component.html',
  styleUrls: ['./summary-dialog-form.component.scss']
})
export class SummaryDialogFormComponent implements OnInit {
  public ckeditor = ClassicEditor;
  public summaryData:string;
  public summaryForm: UntypedFormGroup;
  public skills:Skill[]=[]
  public categories:SkillCategory[]=[]    
  private _category:SkillCategory[];
  private isEdit:boolean=false;

  public constructor(
    public dialogRef:MatDialogRef<SummaryDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Dialog<Summary>,
    private spinnerService:SpinnerService, 
    private resumeService:ResumeService, 
    private fb:UntypedFormBuilder
  ){}

  public set category(category:SkillCategory[]){
    this._category = category;
  }

  public get category(){
    return this._category
  }

  public ngOnInit(): void {
    this.getSkills();
    this.isEdit = !!this.data?.content.summary ;
    this.createForm();    
  }

  public saveSummary(){
    const params = this.getSummaryFormValues();
    this.spinnerService.showSpinner();
    const service = this.isEdit ? this.resumeService.putSummaries(params) : this.resumeService.postSummaries(params)
    service.subscribe( (response) =>{    
      this.resetSummaryForm();
      this.spinnerService.hideSpinner();
      this.dialogRef.close(true)
    })
  }

  public skillChange(event:any){
    this.category = this.categories.filter(e => e.skill === event.value)
  }

  public skillChangeByEdit(value:string){
    this.category = this.categories.filter(e => e.skill === value)
  }

  public close(){
    this.dialogRef.close(false)
  }

  public onChangeSummary( {editor}: ChangeEvent ) {
    this.summaryForm.controls['summary'].setValue( editor.data.get() )
  }

  private getSkills(){
    this.resumeService.getSkills().subscribe( (response:EntityTotals<Skill>) =>{    
      if(response){
        this.skills = response.entity;
        this.getSkillsCategory();
      }      
    })
  }

  private getSkillsCategory(){
    this.resumeService.getSkillsCategory().subscribe( (response:EntityTotals<SkillCategory>) =>{    
      if(response){
        this.categories = response.entity;
        if(this.isEdit){
          this.skillChangeByEdit(this.data.content.skill)
        }
      }      
    })
  }

  private createForm(){
    this.summaryData = this.isEdit ? this.data.content.summary : ''
    const skill = this.isEdit ? this.data.content.skill : '';
    const category = this.isEdit ? this.data.content.category : '';
    this.summaryForm = this.fb.group({
      summary:[this.summaryData,{validators:[Validators.required]}],
      skill:[skill,{validators:[Validators.required]}],
      category:[category,{validators:[Validators.required]}]
    })
  }

  
  private getSummaryFormValues(){
    let values:any = {
      summary:this.summaryForm.get('summary')?.value,
      skill:this.summaryForm.get('skill')?.value,
      category:this.summaryForm.get('category')?.value,
    };
    if(this.isEdit){
      values.id = this.data.content._id
    }
    return values
  }

  private resetSummaryForm(){
    this.summaryForm.controls['summary'].setValue('')
    this.summaryForm.controls['skill'].setValue('')
    this.summaryForm.controls['category'].setValue('')
  }
}
