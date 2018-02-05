import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompleteComponent } from './test-complete.component';
import {testImports, testProviders} from "./test.helper.spec";

describe('TestCompleteComponent', () => {
  let component: TestCompleteComponent;
  let fixture: ComponentFixture<TestCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCompleteComponent ],
      providers: testProviders,
      imports: testImports
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
