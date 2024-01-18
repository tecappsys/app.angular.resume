import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDialogFormComponent } from './summary-dialog-form.component';

describe('SummaryDialogFormComponent', () => {
  let component: SummaryDialogFormComponent;
  let fixture: ComponentFixture<SummaryDialogFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryDialogFormComponent]
    });
    fixture = TestBed.createComponent(SummaryDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
