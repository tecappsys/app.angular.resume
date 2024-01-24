import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SkillCategoryGroupBy } from '@src/app/shared/interface/skill-category-group-by.interface';
import { Skill } from '@src/app/shared/interface/skill.interface';
import { Summary } from '@src/app/shared/interface/summary.interface';

@Component({
  selector: 'app-accordion-panel-skill',
  templateUrl: './accordion-panel-skill.component.html',
  styleUrls: ['./accordion-panel-skill.component.scss']
})
export class AccordionPanelSkillComponent {
  @Output() public summaryChange: EventEmitter<any> = new EventEmitter();
  @Input() public skillsCategoryGroupBySkill: SkillCategoryGroupBy<Skill>[] = [];
  @Input() public summaries:Summary[]=[];
  @Input() public summarySelected:Summary[]=[]

  public constructor(){}

  public selectSummary(event:any,summary:Summary){
    this.summaryChange.emit({event,summary});
  }

  public sanitizeText(text:string){
    return text.replaceAll('<p>','').replaceAll('</p>','').replaceAll('<strong>','').replaceAll('</strong>','') 
  }

  public validateChecked(summary:Summary){
    return this.summarySelected.find(e => e._id === summary._id) ? true : false;
  }

}
