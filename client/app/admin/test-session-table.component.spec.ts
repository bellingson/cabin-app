import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSessionTableComponent } from './test-session-table.component';

describe('TestSessionTableComponent', () => {
  let component: TestSessionTableComponent;
  let fixture: ComponentFixture<TestSessionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSessionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSessionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
