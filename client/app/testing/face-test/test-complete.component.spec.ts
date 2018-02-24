import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TestCompleteComponent } from './test-complete.component';
import {testImports, testProviders} from "./test.helper.spec";
import {TestService} from "./test.service";

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

  it('ngOnInit', inject([TestService],(testService: TestService) => {

    let session = testService.createSession();

    testService.testSessions.next([session]);

    component.ngOnInit();

    expect(component.session).toBeTruthy();
  }));

});
