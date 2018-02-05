import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import {FACES} from "./faces";

import * as _filter from 'lodash/filter';

import {TestSample, TimeClass} from "./test-sample.model";
import {TestService} from "./test.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";

enum Side {
    LEFT,
    RIGHT
}

const responseTime = { fast: 600, ok: 900, slow: 1500, timeout: 3000 };

@Component({
  selector: 'app-face-test',
  templateUrl: './face-test.component.html',
  styleUrls: ['./face-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaceTestComponent implements OnInit {

  faces: Array<any> = FACES;

  currentSample: TestSample;
  samples: Array<TestSample> = [];

  currentIndex: number;

  sampleCount: number;
  accuracy: number;

  correctSide: Side;
  neutralSide: Side;

  // images
  leftImage: string;
  rightImage: string;

  // UI State
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

  responseTime;

  settings: any;

  loading = true;

  user: User;

  options: any;

  constructor(private userService: UserService,
              private testService: TestService,
              private router: Router) {

  }

  ngOnInit() {

      this.testService.options.subscribe(options => this.options = options);

      this.testService.sampleCount.subscribe(_sampleCount => this.sampleCount = _sampleCount);

      this.userService.user.subscribe(user => this.user = user);

      this.testService.preloadImages()
            .subscribe(() => {
                this.loading = false;
                this.nextSample();
            }, err => {
              console.log(err);
                this.loading = false;
                this.nextSample();
            });

      // this.currentIndex = 0;
      // this.showDotLeft = true;

      // console.log('screen width: ' + window.innerWidth);


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

      // finish
      if(this.checkFinished()) {
          return;
      }

      this.currentSample = new TestSample();
      this.currentSample.ordinal = this.samples.length;

      this.currentIndex = Math.floor(Math.random() * this.faces.length);
      this.neutralSide = Math.random() <= 0.5 ? Side.LEFT : Side.RIGHT;

      let face = this.faces[this.currentIndex];
      this.assignImages(face);

      this.displayFaces();

      // 1 show faces
      setTimeout(() => {
          this.showFaces = false;

          // 2 show shapes
          setTimeout(this.displayShapes.bind(this), this.options.display.hideFaces);

      }, this.options.display.showFaces); // 1000


  }

  private displayShapes() {

    this.canClick = true;
    this.showShapes = true;
    this.showDotLeft = this.correctSide == Side.LEFT;
    this.showDotRight = this.correctSide == Side.RIGHT;
    this.currentSample.startTime = Date.now();

    // 3 hide dot
    setTimeout(this.hideShapes.bind(this), this.options.display.showShapes);
  }

  private hideShapes() {

    if(this.currentSample) {
      this.showShapes = false;
      this.showDotLeft = false;
      this.showDotRight = false;
    }

  }

  private displayFaces() {

    if(this.user.controlVersion) {

      // console.log('control version true');

      this.correctSide = Math.random() <= 0.5 ? Side.LEFT : Side.RIGHT;
      this.currentSample.showDotOnNeutralFace = this.correctSide == this.neutralSide;
    } else {

      // console.log('control version false');

      this.correctSide = this.neutralSide;
      this.currentSample.showDotOnNeutralFace = true;
    }

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

    this.showFaces = true;

  }


  checkFinished() : boolean {

      let samples = _filter(this.samples, sample => sample.timeClass != TimeClass.TOO_SLOW);
      if(samples.length < this.sampleCount) {
          return false;
      }

      let testSession = this.testService.testComplete(this.samples)

      this.testService.uploadResults(testSession)
                        .subscribe(success => {
                              this.router.navigateByUrl('/t/test-complete');
                          }, err => {
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

      this.currentSample.correct = correct;
      this.currentSample.time = Date.now() - this.currentSample.startTime;
      this.currentSample.timeClass = this.classForTime(this.currentSample.time);

      this.responseTime = this.responseTimeString(this.currentSample.timeClass);

      this.samples.push(this.currentSample);

      this.checkAccuracy();

      this.currentSample = null;
      this.canClick = false;

      setTimeout(() => {
          this.nextSample();
      }, 1000);
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
