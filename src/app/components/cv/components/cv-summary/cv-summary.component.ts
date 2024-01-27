import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-cv-summary',
  templateUrl: './cv-summary.component.html',
  styleUrls: ['./cv-summary.component.scss']
})
export class CvSummaryComponent {
  @Output() public formChange: EventEmitter<void> = new EventEmitter();
  @Input() public experienceForm:FormGroup;
  public ckeditor = ClassicEditor;

  public constructor(){}

  public onPresentChange(change:any){
    if(change.checked){
      this.experienceForm.controls['endDate'].setValue('');
    }
    change.checked ? this.experienceForm.get('endDate')?.disable() : this.experienceForm.get('endDate')?.enable();
    this.onFormChange();
  }

  public onFormChange(){
    this.formChange.emit();
  }
}
