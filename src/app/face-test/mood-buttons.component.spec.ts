import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodButtonsComponent } from './mood-buttons.component';
import {testImports, testProviders} from "./test.helper.spec";

describe('MoodButtonsComponent', () => {
  let component: MoodButtonsComponent;
  let fixture: ComponentFixture<MoodButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodButtonsComponent ],
      providers: testProviders,
      imports: testImports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
