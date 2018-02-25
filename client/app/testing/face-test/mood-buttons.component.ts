import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {moodDescription, MOODS} from "./mood";

@Component({
  selector: 'app-mood-buttons',
  templateUrl: './mood-buttons.component.html',
  styleUrls: ['./mood-buttons.component.scss']
})
export class MoodButtonsComponent implements OnInit {

  @Output() mood = new EventEmitter<number>();

  buttons = MOODS;

  constructor() { }

  ngOnInit() {

  }

  moodDescription(mood: number) : string {
    return moodDescription(mood);
  }

  moodTouched(mood: number) {
    this.mood.emit(mood);
  }


}
