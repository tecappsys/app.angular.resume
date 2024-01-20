import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-accordion-panel-job',
  templateUrl: './accordion-panel-job.component.html',
  styleUrls: ['./accordion-panel-job.component.scss']
})
export class AccordionPanelJobComponent {
  @Output() public jobTitleChange: EventEmitter<any> = new EventEmitter();
  @Input() public jobTitles:any[]=[];

  public constructor(){}

  public selectJobTitle(event:any,job:any){
    this.jobTitleChange.emit({event,job});
  }
}
