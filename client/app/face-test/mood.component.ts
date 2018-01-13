import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {Mood, MOOD_CATEGORY} from "./mood";

import * as _ from 'lodash';
import {TestService} from "./test.service";

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss']
})
export class MoodComponent implements OnInit {

  responses = [];
  index = 0;

  mood: string;

  constructor(private testService: TestService,
              private router: Router) { }

  ngOnInit() {

    this.testService.startSession();

    this.showNextMood();
  }

  showNextMood() {

    if(this.index == MOOD_CATEGORY.length) {
       this.testService.setMoods(this.responses);
       this.router.navigateByUrl('/test');
       return;
    }

    this.mood = MOOD_CATEGORY[this.index++];
  }

  moodSelected(value: Mood) {

     this.responses.push({ mood: this.mood, value: value });
     this.showNextMood();
  }



}
