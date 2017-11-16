import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import {FACES} from "./faces";
import {TestSample} from "../test-sample.model";
import {TestService} from "./test.service";

const sampleCount = 5;

enum Side {
    LEFT,
    RIGHT
}

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
  correctSide: Side;
  neutralSide: Side;


  // images
  leftImage: string;
  rightImage: string;

  // UI State
  showFaces = false;
  showDotLeft = false;
  showDotRight = false;
  canClick = false;

  // response
  showCorrectLeft = false;
  showIncorrectLeft = false;
  showCorrectRight = false;
  showIncorrectRight = false;

  isLandscape = false;

  constructor(private testService: TestService,
              private router: Router) { }

  ngOnInit() {

      this.isLandscape = window.innerWidth > window.innerHeight;

      // this.currentIndex = 0;
      // this.showDotLeft = true;

      this.nextSample();
  }

  nextSample() {

      // finish
      if(this.checkFinished()) {
          return;
      }

      this.currentSample = new TestSample();
      this.currentSample.ordinal = this.samples.length;
      // this.currentSample.startTime = Date.now();

      this.currentIndex = Math.floor(Math.random() * this.faces.length);

      this.neutralSide = Math.random() <= 0.5 ? Side.LEFT : Side.RIGHT;

      let face = this.faces[this.currentIndex];
      this.assignImages(face);

      this.correctSide = Math.random() <= 0.5 ? Side.LEFT : Side.RIGHT;

      this.currentSample.showDotOnNeutralFace = this.correctSide == this.neutralSide;

      // response
      this.showCorrectLeft = false;
      this.showIncorrectLeft = false;
      this.showCorrectRight = false;
      this.showIncorrectRight = false;

      // input
      this.showDotLeft = false;
      this.showDotRight = false;
      this.canClick = false;

      this.showFaces = true;

      // if(1 == true) {
      //     return;
      // }

      // 1 show faces
      setTimeout(() => {
          this.showFaces = false;

          // 2 show dot
          setTimeout(() => {

              this.canClick = true;
              this.showDotLeft = this.correctSide == Side.LEFT;
              this.showDotRight = this.correctSide == Side.RIGHT;
              this.currentSample.startTime = Date.now();

              // 3 hide dot
              setTimeout(() => {
                  if(this.currentSample) {
                      this.showDotLeft = false;
                      this.showDotRight = false;
                  }
              }, 1000);

          }, 300);

      }, 1000);

  }

  checkFinished() : boolean {

      if(this.samples.length < sampleCount) {
          return false;
      }

      let testSession = this.testService.testComplete(this.samples)

      this.testService.uploadResults(testSession)
                        .subscribe(success => {
                              this.router.navigateByUrl('/test-complete');
                              // this.router.navigateByUrl('/results-list');
                          }, err => {
                              console.log(err);
                              this.router.navigateByUrl('/upload-failed');
                          });

      return true;
  }

  assignImages(face: any) {
      if(this.neutralSide == Side.LEFT) {
          this.leftImage = face.n;
          this.rightImage = face.f;
          console.log('netural left');
      } else {
          this.leftImage = face.f;
          this.rightImage = face.n;
          console.log('netural right');
      }
  }

  clickLeft() {

      console.log('left')

      let correct = this.correctSide == Side.LEFT;
      if(correct) {
          this.showCorrectLeft = true;
      } else {
          this.showIncorrectLeft = true;
      }

      this.handleResponse(correct);


  }

  clickRight() {
      console.log('right')

      let correct = this.correctSide == Side.RIGHT;
      if(correct) {
          this.showCorrectRight = true;
      } else {
          this.showIncorrectRight = true;
      }

      this.handleResponse(correct);

  }

  handleResponse(correct: boolean) {

      this.currentSample.correct = correct;
      this.currentSample.time = Date.now() - this.currentSample.startTime;

      this.samples.push(this.currentSample);
      this.currentSample = null;
      this.canClick = false;

      setTimeout(() => {
          this.nextSample();
      }, 1000);
  }


  classForIndex(index: number) {

      if(this.currentIndex != null && this.currentIndex === index) {
          return 'faces show';
      }

      return 'faces hidden';
  }

}
