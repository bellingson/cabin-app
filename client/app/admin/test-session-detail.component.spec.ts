import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSessionDetailComponent } from './test-session-detail.component';
import {AdminLinksComponent} from "./admin-links.component";
import {testImports, testProviders} from "../testing/face-test/test.helper.spec";

describe('TestSessionDetailComponent', () => {
  let component: TestSessionDetailComponent;
  let fixture: ComponentFixture<TestSessionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSessionDetailComponent, AdminLinksComponent ],
      imports: testImports,
      providers: testProviders
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
