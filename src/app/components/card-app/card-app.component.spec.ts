import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAppComponent } from './card-app.component';

describe('CardAppComponent', () => {
  let component: CardAppComponent;
  let fixture: ComponentFixture<CardAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAppComponent]
    });
    fixture = TestBed.createComponent(CardAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
