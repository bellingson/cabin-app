import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {Mood, moodDescription} from "./mood";
import {TestService} from "./test.service";

@Component({
  selector: 'app-mood-active',
  templateUrl: './mood-active.component.html',
  styleUrls: ['./mood-active.component.scss']
})
export class MoodActiveComponent implements OnInit {

  constructor(private testService: TestService,
              private router: Router) { }

  ngOnInit() {
  }

  moodSelected(active: Mood) {

    this.testService.startSession(active);

    this.router.navigateByUrl('/mood-afraid');

  }

}
