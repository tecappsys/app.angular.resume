import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-accordion-panel-experience',
  templateUrl: './accordion-panel-experience.component.html',
  styleUrls: ['./accordion-panel-experience.component.scss']
})
export class AccordionPanelExperienceComponent implements OnInit{

  @Output() public formChange: EventEmitter<void> = new EventEmitter();
  @Input() public experienceForm:FormGroup
  private _show:boolean;

  public ckeditor = ClassicEditor;

  public constructor (){}

  public ngOnInit(): void {
    this.show = this.experienceForm.get('show')?.value
    this.experienceForm.get('show')!.valueChanges.subscribe(data => {
      this.show = data
    })    
  }

  public set show(show:boolean){
    this._show = show
  }
  
  public get show(){
    return this._show;
  }

  public get getJobTitle(){
    return this.experienceForm.get('jobTitle')?.value
  }

  public get getEmployerTitle(){
    return this.experienceForm.get('employer')?.value
  }

  public panelState(state:boolean){
    this.show = state;
    this.experienceForm.controls['show'].setValue(state);    
    this.onFormChange();
  }

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
