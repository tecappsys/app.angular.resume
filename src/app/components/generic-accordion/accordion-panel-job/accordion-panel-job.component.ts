import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobTitle } from '@src/app/shared/interface/job-title.interface';

@Component({
  selector: 'app-accordion-panel-job',
  templateUrl: './accordion-panel-job.component.html',
  styleUrls: ['./accordion-panel-job.component.scss']
})
export class AccordionPanelJobComponent {
  @Output() public jobTitleChange: EventEmitter<any> = new EventEmitter();
  @Input() public jobTitles:any[]=[];
  @Input() public jobTitleSelected:any[]=[];

  public constructor(){}

  public selectJobTitle(event:any,jobTitle:JobTitle){
    this.jobTitleChange.emit({event,jobTitle});
  }

  public validateChecked(jobTitle:JobTitle){
    return this.jobTitleSelected.find(e => e._id === jobTitle._id);
  }
}
