import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Summary } from '@src/app/shared/interface/summary.interface';

@Component({
  selector: 'app-generic-accordion',
  templateUrl: './generic-accordion.component.html',
  styleUrls: ['./generic-accordion.component.scss']
})
export class GenericAccordionComponent {

  @Output() public ckeditorChange: EventEmitter<any> = new EventEmitter();
  @Output() public summaryChange: EventEmitter<any> = new EventEmitter();
  @Output() public jobTitleChange: EventEmitter<any> = new EventEmitter();
  @Input() public jobTitles:any[]=[];
  @Input() public skillsCategoryGroupBySkill: any[] = [];
  @Input() public summaries:Summary[]=[];

  @Input() public jobTitleSelected:any[]=[];
  @Input() public ckeditor:any;
  @Input() public dataCkeditor:string;

  @Input() public isExperience:boolean=false;

  public onSummaryChange(event:any){
    this.summaryChange.emit(event)
  }

  public onJobTitleChange(event:any){
    this.jobTitleChange.emit(event)
  }

  public onCkeditorChange(event:any){
    this.ckeditorChange.emit(event)
  }

}
