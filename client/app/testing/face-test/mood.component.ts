import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {Mood, MOOD_CATEGORY} from "./mood";

import {TestService} from "./test.service";
import {FACES} from "./faces";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss']
})
export class MoodComponent implements OnInit {

  faces = FACES;

  responses = [];
  index = 0;

  mood: string;

  canTakeTest = false;

  sessionsThisWeekCount: number;
  sessionsTodayCount: number;

  loading = true;

  constructor(private userService: UserService,
              private testService: TestService,
              private router: Router) { }

  ngOnInit() {

    this.userService.fetchAndUpdateParticipant()
      .subscribe(r => {
        this.userLoaded();
      }, err => {

        this.userLoaded();
      });

  }

  userLoaded() {

    this.loading = false;

    this.canTakeTest = this.testService.canTakeTest();

    if(this.canTakeTest == false) {
      this.sessionsThisWeekCount = this.testService.sessionsThisWeek().length;
      this.sessionsTodayCount = this.testService.sessionsToday().length;
      return;
    }


    this.testService.startSession();

    this.showNextMood();

  }


  showNextMood() {

    if(this.index == MOOD_CATEGORY.length) {
       this.testService.setMoods(this.responses);
       this.router.navigateByUrl('/t/try-your-best');
       return;
    }

    this.mood = MOOD_CATEGORY[this.index++];
  }

  moodSelected(value: Mood) {

     this.responses.push({ mood: this.mood, value: value });
     this.showNextMood();
  }



}
