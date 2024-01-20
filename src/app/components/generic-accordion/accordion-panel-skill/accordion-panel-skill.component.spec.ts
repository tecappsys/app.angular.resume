import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionPanelSkillComponent } from './accordion-panel-skill.component';

describe('AccordionPanelSkillComponent', () => {
  let component: AccordionPanelSkillComponent;
  let fixture: ComponentFixture<AccordionPanelSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionPanelSkillComponent]
    });
    fixture = TestBed.createComponent(AccordionPanelSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
