import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobTitle } from '@src/app/shared/interface/job-title.interface';
import { SkillCategoryGroupBy } from '@src/app/shared/interface/skill-category-group-by.interface';
import { Skill } from '@src/app/shared/interface/skill.interface';
import { Summary } from '@src/app/shared/interface/summary.interface';

@Component({
  selector: 'app-generic-accordion',
  templateUrl: './generic-accordion.component.html',
  styleUrls: ['./generic-accordion.component.scss']
})
export class GenericAccordionComponent {

  @Output() public summaryChange: EventEmitter<any> = new EventEmitter();
  @Output() public formChange: EventEmitter<void> = new EventEmitter();

  @Output() public changeEmploye: EventEmitter<any> = new EventEmitter();
  @Output() public changeStartDate: EventEmitter<any> = new EventEmitter();
  @Output() public changeEndDate: EventEmitter<any> = new EventEmitter();

  @Input() public show:boolean;
  @Input() public skillsCategoryGroupBySkill: SkillCategoryGroupBy<Skill>[] = [];
  @Input() public summaries:Summary[]=[];
  @Input() public summarySelected:Summary[]=[];
  @Input() public isExperience:boolean=false;

  // Experience Component
  @Input() public experienceForm:any;

  public onSummaryChange(event:any){
    this.summaryChange.emit(event);
  }

  public onFormChange(){
    this.formChange.emit();
  }

}
