import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAccordionComponent } from './generic-accordion.component';

describe('GenericAccordionComponent', () => {
  let component: GenericAccordionComponent;
  let fixture: ComponentFixture<GenericAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericAccordionComponent]
    });
    fixture = TestBed.createComponent(GenericAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
