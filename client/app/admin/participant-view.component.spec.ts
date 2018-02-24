import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantViewComponent } from './participant-view.component';
import {AdminLinksComponent} from "./admin-links.component";
import {testImports, testProviders} from "../testing/face-test/test.helper.spec";
import {TestSessionTableComponent} from "./test-session-table.component";

describe('ParticipantViewComponent', () => {
  let component: ParticipantViewComponent;
  let fixture: ComponentFixture<ParticipantViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantViewComponent, TestSessionTableComponent, AdminLinksComponent ],
      imports: testImports,
      providers: testProviders
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
