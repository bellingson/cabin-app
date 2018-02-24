import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodComponent } from './mood.component';
import {testImports, testProviders} from "./test.helper.spec";
import {MoodButtonsComponent} from "./mood-buttons.component";
import {Mood} from "./mood";

describe('MoodComponent', () => {
  let component: MoodComponent;
  let fixture: ComponentFixture<MoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodComponent, MoodButtonsComponent ],
      imports: testImports,
      providers: testProviders
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {

    component.ngOnInit();

    expect(component.mood).toBeTruthy();
  });

  it('showNextMood', () => {

    component.ngOnInit();

    component.showNextMood();

    expect(component.mood).toBeTruthy();
  });

  it('moodSelected', () => {

    component.ngOnInit();

    component.moodSelected(Mood.A_LITTLE);

    expect(component.responses.length).toBeGreaterThan(0);
  });



});
