import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FaceTestComponent, Side} from './face-test.component';
import {testImports, testProviders} from "./test.helper.spec";
import {FaceComponent} from "./face.component";

import {testUser} from "../user/user.service.mock";
import {TestSample, TimeClass} from "./test-sample.model";

describe('FaceTestComponent', () => {
  let component: FaceTestComponent;
  let fixture: ComponentFixture<FaceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceTestComponent, FaceComponent ],
      providers: testProviders,
      imports: testImports
    })
    .compileComponents();
  }));

  beforeEach(() => {

      fixture = TestBed.createComponent(FaceTestComponent);
      component = fixture.componentInstance;

      component.setMyTimeout = (fn: any, time: number) : number => {
        console.log('set timeout: ' + time);

        return 0;
      };

      component.user = testUser;

      fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {

    component.ngOnInit();

    expect(component.options).toBeTruthy();
    expect(component.sampleCount).toBeTruthy();
    expect(component.extraSampleCount).toBeTruthy();
    expect(component.user).toBeTruthy();
    expect(component.testSession).toBeTruthy();
  });


  it('nextSample', () => {

    component.ngOnInit();

    component.nextSample();

    expect(component.currentSample).toBeTruthy();
    expect(component.showResume).toBe(false);
    expect(component.showFaces).toBe(true);

    expect(component.showCorrectLeft).toBe(false);
    expect(component.showIncorrectLeft).toBe(false);
    expect(component.showCorrectRight).toBe(false);
    expect(component.showIncorrectRight).toBe(false);

    expect(component.responseTime).toBe(null);
    expect(component.showCorrect).toBe(false);
    expect(component.showIncorrect).toBe(false);

    // input
    expect(component.showShapes).toBe(false);
    expect(component.showShapes).toBe(false);
    expect(component.showDotLeft).toBe(false);
    expect(component.showDotRight).toBe(false);
    expect(component.canClick).toBe(false);

  });

  it('displayShapes', () => {

    component.ngOnInit();

    component.nextSample();

    component.displayShapes();

    expect(component.currentSample).toBeTruthy();
    expect(component.canClick).toBe(true);
    expect(component.currentSample.startTime).toBeTruthy();


  });

  it('hideShapes', () => {

    component.ngOnInit();

    component.nextSample();

    component.displayShapes();
    component.hideShapes();

    component.clearTimer()

    expect(component.currentSample).toBeTruthy();
    expect(component.canClick).toBe(true);
    expect(component.canClick).toBe(true);

  });

  /*
  it('setTimeoutTimer and clearTimer', () => {

    component.ngOnInit();

    component.setTimeoutTimer();

    expect(component.timer).toBeTruthy();

    component.clearTimer();

    expect(component.timer).toBe(null);
  });
  */

  it('resume', () => {

    component.ngOnInit();

    component.resume();

    expect(component.currentSample).toBeTruthy();
    expect(component.showResume).toBe(false);
    expect(component.showFaces).toBe(true);

    expect(component.showCorrectLeft).toBe(false);
    expect(component.showIncorrectLeft).toBe(false);
    expect(component.showCorrectRight).toBe(false);
    expect(component.showIncorrectRight).toBe(false);

    expect(component.responseTime).toBe(null);
    expect(component.showCorrect).toBe(false);
    expect(component.showIncorrect).toBe(false);

    // input
    expect(component.showShapes).toBe(false);
    expect(component.showShapes).toBe(false);
    expect(component.showDotLeft).toBe(false);
    expect(component.showDotRight).toBe(false);
    expect(component.canClick).toBe(false);
  });

  it('displayStimuli', () => {

    component.ngOnInit();

    let sample = new TestSample();
    sample.time = 300;
    sample.correct = true;
    sample.timeClass = TimeClass.FAST;

    component.currentSample = sample;

    component.displayStimuli();

    expect(component.showResume).toBe(false);
    expect(component.showFaces).toBe(true);

  });

  it('checkFinished', () => {

    component.ngOnInit();

    component.sampleCount = 1;
    component.extraSampleCount = 1;

    component.validSamples = () => {
        return [];
    };

    let finished = component.checkFinished();

    expect(finished).toBe(false);

    component.validSamples = () => {

      let sample = new TestSample();
      sample.time = 300;
      sample.correct = true;
      sample.timeClass = TimeClass.FAST;

      return [sample, sample ];
    };

    finished = component.checkFinished();

    expect(finished).toBe(true);

  });

  it('clickLeft correct', () => {

    component.ngOnInit();

    component.correctSide = Side.LEFT;

    let called = false;

    component.handleResponse = correct => {
       called = true;
    };

    component.clickLeft();

    expect(called).toBe(true);

  });

  it('clickLeft incorrect', () => {

    component.ngOnInit();

    component.correctSide = Side.RIGHT;

    let called = false;

    component.handleResponse = correct => {
      called = true;
    };

    component.clickLeft();

    expect(called).toBe(true);

  });

  it('clickRight correct', () => {

    component.ngOnInit();

    component.correctSide = Side.RIGHT;

    let called = false;

    component.handleResponse = correct => {
      called = true;
    };

    component.clickRight();

    expect(called).toBe(true);

  });

  it('clickRight incorrect', () => {

    component.ngOnInit();

    component.correctSide = Side.LEFT;

    let called = false;

    component.handleResponse = correct => {
      called = true;
    };

    component.clickRight();

    expect(called).toBe(true);

  });

  /*
  it('handleResponse', () => {

    component.ngOnInit();

    let sample = new TestSample();
    sample.startTime = Date.now();

    component.currentSample = sample;

    component.handleResponse(true);

    expect(sample.time).toBeTruthy();


  });

*/




});
