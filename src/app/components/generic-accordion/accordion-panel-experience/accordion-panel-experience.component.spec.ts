import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionPanelExperienceComponent } from './accordion-panel-experience.component';

describe('AccordionPanelExperienceComponent', () => {
  let component: AccordionPanelExperienceComponent;
  let fixture: ComponentFixture<AccordionPanelExperienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionPanelExperienceComponent]
    });
    fixture = TestBed.createComponent(AccordionPanelExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
