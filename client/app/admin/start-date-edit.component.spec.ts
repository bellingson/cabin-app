import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDateEditComponent } from './start-date-edit.component';

describe('StartDateEditComponent', () => {
  let component: StartDateEditComponent;
  let fixture: ComponentFixture<StartDateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartDateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartDateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
