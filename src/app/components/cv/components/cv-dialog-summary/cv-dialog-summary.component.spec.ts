import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvDialogSummaryComponent } from './cv-dialog-summary.component';

describe('CvDialogSummaryComponent', () => {
  let component: CvDialogSummaryComponent;
  let fixture: ComponentFixture<CvDialogSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvDialogSummaryComponent]
    });
    fixture = TestBed.createComponent(CvDialogSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
