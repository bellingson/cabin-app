import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSessionTableComponent } from './test-session-table.component';
import {testImports, testProviders} from "../testing/face-test/test.helper.spec";

describe('TestSessionTableComponent', () => {
  let component: TestSessionTableComponent;
  let fixture: ComponentFixture<TestSessionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSessionTableComponent ],
      imports: testImports,
      providers: testProviders
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
