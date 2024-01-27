import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvMultipleAddSummaryComponent } from './cv-multiple-add-summary.component';

describe('CvMultipleAddSummaryComponent', () => {
  let component: CvMultipleAddSummaryComponent;
  let fixture: ComponentFixture<CvMultipleAddSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvMultipleAddSummaryComponent]
    });
    fixture = TestBed.createComponent(CvMultipleAddSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
