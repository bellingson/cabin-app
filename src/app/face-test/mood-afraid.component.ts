import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {TestService} from "./test.service";
import {Mood} from "./mood";

@Component({
  selector: 'app-mood-afraid',
  templateUrl: './mood-afraid.component.html',
  styleUrls: ['./mood-afraid.component.scss']
})
export class MoodAfraidComponent implements OnInit {

  constructor(private testService: TestService,
              private router: Router) { }

  ngOnInit() {
  }

  moodSelected(afraid: Mood) {

    this.testService.setAfraid(afraid);

    this.router.navigateByUrl('/test');

  }


}
