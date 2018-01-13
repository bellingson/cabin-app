import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSessionDetailComponent } from './test-session-detail.component';

describe('TestSessionDetailComponent', () => {
  let component: TestSessionDetailComponent;
  let fixture: ComponentFixture<TestSessionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSessionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSessionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
