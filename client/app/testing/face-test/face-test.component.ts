import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import {FACES, WORDS} from "./faces";

import * as _filter from 'lodash/filter';

import {TestSample, TimeClass} from "./test-sample.model";
import {STIMULI_FACES, TestService} from "./test.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";
import {TestSession} from "./test-session.model";
import {TestDataService} from "./test-data.service";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export enum Side {
    LEFT,
    RIGHT
}

@Component({
  selector: 'app-face-test',
  templateUrl: './face-test.component.html',
  styleUrls: ['./face-test.component.scss']
})
export class FaceTestComponent implements OnInit {

  faces: Array<any> = FACES;
  words: Array<any> = WORDS;

  testSession: TestSession;
  currentSample: TestSample;
  samples: Array<TestSample> = [];

  currentIndex: number;

  sampleCount: number;
  extraSampleCount: number;
  accuracy: number;

  correctSide: Side;
  neutralSide: Side;

  // images
  leftImage: string;
  rightImage: string;

  // words
  leftWord: string;
  rightWord: string;

  // UI State
  showPlus = true;
  showFaces = false;
  showShapes = false;
  showDotLeft = false;
  showDotRight = false;
  canClick = false;

  // response
  showCorrectLeft = false;
  showIncorrectLeft = false;
  showCorrectRight = false;
  showIncorrectRight = false;

  showCorrect = false;
  showIncorrect = false;

  showResume = false;

  responseTime: string;

  settings: any;

  loading = true;
  finishing = false;

  user: User;

  options: any;
  display: any;

  timer: any;

  constructor(private userService: UserService,
              private testService: TestService,
              private testDataService: TestDataService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {

      this.testService.options.subscribe(options => {
        this.options = options;
        this.userService.user.subscribe(user => {
          this.user = user;
          this.display = this.options.display[`level${this.user.level}`];
          // console.log(this.display);
        });
      });

      this.testService.sampleCount.subscribe(_sampleCount => this.sampleCount = _sampleCount);
      this.testService.extraSampleCount.subscribe(_extraSampleCount => this.extraSampleCount = _extraSampleCount);

      this.testService.currentSession.subscribe(testSession => this.testSession = testSession);
      if(this.testSession == null) {
        this.testService.startSession();
      }

      // console.log('new session: ' + this.testSession.stimuli);

      this.testService.preloadImages()
            .subscribe(this.loadingComplete.bind(this),
                       this.loadingComplete.bind(this));

      // console.log('screen width: ' + window.innerWidth);

  }

  private loadingComplete() {

    this.loading = false;

    this.route.queryParams.subscribe(queryParams => {
      if(queryParams['resume']) {
        this.resumeSession();
      }

      this.nextSample();

    });

  }

  private resumeSession() {

    console.log('resuming session...')

    let _session;
    this.testService.currentSession.subscribe(session => _session = session);
    if(_session) {
      this.samples = _session.samples;
    }

    this.samples = this.samples ? this.samples : [];

    // console.log(this.samples.length);

  }


  /*
Control version: in the control version the target dot will occur in equal numbers
behind the affective (n = 50) and neutral (n = 50) stimuli. i.e., affective left = 50,
affective right = 50. neutral left = 50, neutral right = 50

Training version: in the training version the target dot will only occur behind the
neutral stimulus (n = 200; neutral left = 100, neutral right = 100, affective
left = 0, affective right = 0).
   */

  nextSample() {

      // clear timer
      this.clearTimer();

      // finish
      if(this.checkFinished()) {
          return;
      }

      this.currentSample = new TestSample();
      this.currentSample.ordinal = this.samples.length;

      this.neutralSide = Math.random() <= 0.5 ? Side.LEFT : Side.RIGHT;

      this.showPlus = true;
      this.showFaces = false;

      this.hideInputAndResponseControls();

      this.setMyTimeout(() => {

        this.selectStimuli();

        this.displayStimuli();

        // 1 show faces
        this.setMyTimeout(() => {
          this.showFaces = false;

          // 2 show shapes
          this.setMyTimeout(this.displayShapes.bind(this), this.display.hideFaces);

        }, this.display.showFaces); // 1000 showFaces

      }, 1000);  // 1000 show plus


  }

  // mock it to facilitate testing
  setMyTimeout(fn: any, time: number) : number {
     return setTimeout(fn, time);
  }


  displayShapes() {

    // console.log('display shapes');

    this.canClick = true;
    this.showShapes = true;
    this.showDotLeft = this.correctSide == Side.LEFT;
    this.showDotRight = this.correctSide == Side.RIGHT;
    this.currentSample.startTime = Date.now();

    // console.log('user: ' + this.user.level + " : " + this.showShapes + ' : ' + this.showDotLeft + ' : ' + this.showDotRight);

    // 3 hide dot
    this.setMyTimeout(this.hideShapes.bind(this), this.display.showShapes);
  }

  hideShapes() {

    // console.log('hide shapes');

    if(this.currentSample) {
      this.showShapes = false;
      this.showDotLeft = false;
      this.showDotRight = false;
      this.setTimeoutTimer();
    }

  }

  setTimeoutTimer() {

    this.timer = this.setMyTimeout(this.doTimeout.bind(this), this.display.timeOut);

  }

  clearTimer() {
     if(this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
     }
  }

  doTimeout() {

    // console.log('do timeout');

    this.clearTimer();

    this.hideInputAndResponseControls();

    this.showResume = true;

  }

  resume() {
      this.nextSample();
  }

  selectStimuli() {

    if(this.testSession.stimuli == STIMULI_FACES) {

      this.currentIndex = Math.floor(Math.random() * this.faces.length);

      const face = this.faces[this.currentIndex];
      this.assignImages(face);

    } else {

      this.currentIndex = Math.floor(Math.random() * this.words.length);
      const words = this.words[this.currentIndex];
      this.assignWords(words);
    }

  }

  displayStimuli() {

    if(this.shouldUseControlVersion()) {

      // console.log('control version true');

      this.correctSide = Math.random() <= 0.5 ? Side.LEFT : Side.RIGHT;
      this.currentSample.showDotOnNeutralFace = this.correctSide == this.neutralSide;
    } else {

      // console.log('control version false');

      this.correctSide = this.neutralSide;
      this.currentSample.showDotOnNeutralFace = true;
    }

    // this.hideInputAndResponseControls();

    this.showFaces = true;

  }

  private hideInputAndResponseControls() {

    // response
    this.showCorrectLeft = false;
    this.showIncorrectLeft = false;
    this.showCorrectRight = false;
    this.showIncorrectRight = false;

    this.responseTime = null;
    this.showCorrect = false;
    this.showIncorrect = false;

    // input
    this.showShapes = false;
    this.showShapes = false;
    this.showDotLeft = false;
    this.showDotRight = false;
    this.canClick = false;

    this.showResume = false;

  }

  private shouldUseControlVersion() : boolean {

    if(this.user.controlVersion) {
      return true;
    }

    let samples = _filter(this.samples, sample => sample.timeClass != TimeClass.TOO_SLOW);
    if(samples.length > this.sampleCount) {
       return true;
    }

    return false;
  }

  validSamples() : Array<TestSample> {
    return _filter(this.samples, sample => sample.timeClass != TimeClass.TOO_SLOW);
  }

  shouldShowFaces() {
      return  this.showCorrect == false &&
              this.showIncorrect == false &&
              this.showResume == false &&
              this.finishing == false;
  }

  shouldShowPlus() {
    return  this.showPlus == true &&
            this.showCorrect == false &&
            this.showIncorrect == false &&
            this.showResume == false &&
            this.finishing == false;
  }


  checkFinished() : boolean {

      const samples = this.validSamples();
      const totalSamples = this.sampleCount + this.extraSampleCount;
      if(samples.length < totalSamples) {
          return false;
      }

      this.finishing = true;
      this.showCorrect = false;
      this.showIncorrect = false;

      if(this.testSession == null) {
        console.log('warning creating session before upload');
        this.testSession = this.testService.createSession();
      }

      this.testService.formatSessionStats(this.testSession, this.samples)

      this.testDataService.uploadResults(this.testSession)
                        .subscribe(success => {

                              this.router.navigateByUrl('/t/test-complete');
                          }, err => {
                              this.finishing = false;
                              console.log(err);
                              this.router.navigateByUrl('/t/upload-failed');
                          });

      return true;
  }

  assignImages(face: any) {
      if(this.neutralSide == Side.LEFT) {
          this.leftImage = face.n;
          this.rightImage = face.f;
          // console.log('netural left');
      } else {
          this.leftImage = face.f;
          this.rightImage = face.n;
          // console.log('netural right');
      }
  }

  assignWords(words: any) {
    if(this.neutralSide == Side.LEFT) {
      this.leftWord = words.n;
      this.rightWord = words.f;
      // console.log('netural left');
    } else {
      this.leftWord = words.f;
      this.rightWord = words.n;
      // console.log('netural right');
    }
  }


  clickLeft() {

      // console.log('left')

      let correct = this.correctSide == Side.LEFT;
      if(correct) {
          this.showCorrectLeft = true;
          this.showCorrect = true;
      } else {
          this.showIncorrectLeft = true;
          this.showIncorrect = true;
      }

      this.handleResponse(correct);


  }

  clickRight() {
      // console.log('right')

      let correct = this.correctSide == Side.RIGHT;
      if(correct) {
          this.showCorrectRight = true;
          this.showCorrect = true;
      } else {
          this.showIncorrectRight = true;
          this.showIncorrect = true;
      }

      this.handleResponse(correct);

  }

  handleResponse(correct: boolean) {

    // console.log('response : ' + correct);

      this.clearTimer();

      this.currentSample.correct = correct;
      this.currentSample.time = Date.now() - this.currentSample.startTime;
      this.currentSample.timeClass = this.classForTime(this.currentSample.time);

      this.responseTime = this.responseTimeString(this.currentSample.timeClass);

      this.samples.push(this.currentSample);

      this.checkAccuracy();

      this.testService.saveSession(this.samples);

      this.currentSample = null;
      this.canClick = false;
      this.showPlus = false;

      this.setMyTimeout(this.nextSample.bind(this), 1000);
  }



  classForTime(time: number) : TimeClass {

    if(time <= this.options.timeClass.fast)
      return TimeClass.FAST;

    if(time < this.options.timeClass.tooSlow) {
      return TimeClass.OK;
    }

    return TimeClass.TOO_SLOW;
  }

  responseTimeString(timeClass: TimeClass) : string {

    switch (timeClass) {
      case TimeClass.FAST:
          return 'Fast';
      case TimeClass.OK:
          return 'OK';
      default:
          return 'Too Slow';
    }

  }

  checkAccuracy()  {

     const numberCorrect = this.samples.filter(sample => {
                               return sample.correct;
                            }).length;

     this.accuracy = Math.floor(numberCorrect / this.samples.length * 100);

  }


}
