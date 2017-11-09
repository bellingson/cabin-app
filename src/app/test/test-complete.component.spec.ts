import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompleteComponent } from './test-complete.component';

describe('TestCompleteComponent', () => {
  let component: TestCompleteComponent;
  let fixture: ComponentFixture<TestCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
