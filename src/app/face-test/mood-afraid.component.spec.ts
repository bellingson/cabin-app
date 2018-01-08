import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodAfraidComponent } from './mood-afraid.component';
import {MoodButtonsComponent} from "./mood-buttons.component";
import {testImports, testProviders} from "./test.helper.spec";

describe('MoodAfraidComponent', () => {
  let component: MoodAfraidComponent;
  let fixture: ComponentFixture<MoodAfraidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodAfraidComponent, MoodButtonsComponent ],
      providers: testProviders,
      imports: testImports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodAfraidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
