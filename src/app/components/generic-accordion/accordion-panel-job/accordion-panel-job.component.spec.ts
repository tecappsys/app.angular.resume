import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionPanelJobComponent } from './accordion-panel-job.component';

describe('AccordionPanelJobComponent', () => {
  let component: AccordionPanelJobComponent;
  let fixture: ComponentFixture<AccordionPanelJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionPanelJobComponent]
    });
    fixture = TestBed.createComponent(AccordionPanelJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
