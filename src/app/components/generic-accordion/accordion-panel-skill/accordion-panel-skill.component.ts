import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Summary } from '@src/app/shared/interface/summary.interface';

@Component({
  selector: 'app-accordion-panel-skill',
  templateUrl: './accordion-panel-skill.component.html',
  styleUrls: ['./accordion-panel-skill.component.scss']
})
export class AccordionPanelSkillComponent {
  @Output() public summaryChange: EventEmitter<any> = new EventEmitter();
  @Input() public skillsCategoryGroupBySkill: any[] = [];
  @Input() public summaries:Summary[]=[];

  public constructor(){}

  public getSummaryByCategory(category:string){
    return this.summaries.reduce((acc:any[],item) => {
      if(item.category == category){
        acc.push(item)
      }
      return acc
    },[])
  }

  public selectSummary(event:any,summary:Summary){
    this.summaryChange.emit({event,summary});
  }

  public sanitizeText(text:string){
    return text.replaceAll('<p>','').replaceAll('</p>','').replaceAll('<strong>','').replaceAll('</strong>','') 
  }
}
