import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvAccordionSummaryComponent } from './cv-accordion-summary.component';

describe('CvAccordionSummaryComponent', () => {
  let component: CvAccordionSummaryComponent;
  let fixture: ComponentFixture<CvAccordionSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvAccordionSummaryComponent]
    });
    fixture = TestBed.createComponent(CvAccordionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
