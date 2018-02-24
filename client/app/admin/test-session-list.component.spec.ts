import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSessionListComponent } from './test-session-list.component';
import {AdminLinksComponent} from "./admin-links.component";
import {testImports, testProviders} from "../testing/face-test/test.helper.spec";
import {TestSessionTableComponent} from "./test-session-table.component";

describe('TestSessionListComponent', () => {
  let component: TestSessionListComponent;
  let fixture: ComponentFixture<TestSessionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSessionListComponent, TestSessionTableComponent, AdminLinksComponent ],
      imports: testImports,
      providers: testProviders
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
