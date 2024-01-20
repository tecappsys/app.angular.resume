import { Component, EventEmitter, Input, Output } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-accordion-panel-experience',
  templateUrl: './accordion-panel-experience.component.html',
  styleUrls: ['./accordion-panel-experience.component.scss']
})
export class AccordionPanelExperienceComponent {
  @Output() public ckeditorChange: EventEmitter<any> = new EventEmitter();
  @Input() public jobTitleSelected:any[]=[];
  @Input() public ckeditor:any;
  @Input() public dataCkeditor:string;

  public constructor (){}

  public drop(event: any) {
    moveItemInArray(this.jobTitleSelected, event.previousIndex, event.currentIndex);
  }

  public onChange( change:any) {
    this.ckeditorChange.emit(change);
  }
}
