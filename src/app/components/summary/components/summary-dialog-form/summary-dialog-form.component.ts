import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResumeService } from '@src/app/core/resume.service';
import { SpinnerService } from '@src/app/core/spinner.service';
import { Dialog } from '@src/app/shared/class/dialog';
import { Summary } from '@src/app/shared/interface/summary.interface';

@Component({
  selector: 'app-summary-dialog-form',
  templateUrl: './summary-dialog-form.component.html',
  styleUrls: ['./summary-dialog-form.component.scss']
})
export class SummaryDialogFormComponent implements OnInit {
  
  public summaryForm: UntypedFormGroup;
  
  public skills:any[]=[
    {key:'soft',value:'Soft Skill'},
    {key:'hard',value:'Hard Skill'}
  ]
  public categories:any={
    soft:[],
    hard:[      
      {key:'framework',value:'Framework'},
      {key:'data_base',value:'Libraries'},
      {key:'ci_cd',value:'CI / CD'},
      {key:'project_management',value:'Project management'},
      {key:'visual_designer',value:'Visual designer'},
      {key:'other',value:'Other'}
    ]
  }    
  
  private _category:any[];

  public constructor(
    public dialogRef:MatDialogRef<SummaryDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Dialog<Summary>,
    private spinnerService:SpinnerService, 
    private resumeService:ResumeService, 
    private fb:UntypedFormBuilder
  ){}

  public set category(category:any[]){
    this._category = category;
  }

  public get category(){
    return this._category
  }

  public ngOnInit(): void {
    this.createForm();
  }

  public saveSummary(){
    const params = this.getSummaryFormValues();
    this.spinnerService.showSpinner();
    this.resumeService.postSummaries(params).subscribe( (response) =>{    
      this.resetSummaryForm();
      this.spinnerService.hideSpinner();
      this.dialogRef.close()
    })
  }

  public skillChange(event:any){
    this.category = this.categories[event.value]
  }

  public close(){
    this.dialogRef.close()
  }

  private createForm(){
    this.summaryForm = this.fb.group({
      summary:[this.data ? this.data.content.summary : '',{validators:[Validators.required]}],
      skill:[this.data ? this.data.content.skill : '',{validators:[Validators.required]}],
      category:[this.data ? this.data.content.category : '',{validators:[Validators.required]}]
    })
  }

  
  private getSummaryFormValues(){
    return{
      summary:this.summaryForm.get('summary')?.value,
      skill:this.summaryForm.get('skill')?.value,
      category:this.summaryForm.get('category')?.value,
    }
  }

  private resetSummaryForm(){
    this.summaryForm.controls['summary'].setValue('')
    this.summaryForm.controls['skill'].setValue('')
    this.summaryForm.controls['category'].setValue('')
  }
}
