import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

const WORD_DELAY = 400;

@Component({
  selector: 'app-try-your-best',
  templateUrl: './try-your-best.component.html',
  styleUrls: ['./try-your-best.component.scss']
})
export class TryYourBestComponent implements OnInit {

  msg = 'Please try your best to concentrate on the task. Your performance may be compared anonymously with other participants\' performance at a later time.';

  words: Array<string>;
  currentIndex = 0;

  displayMessage: string = '';
  messageComplete = false;

  constructor(private router: Router) { }

  ngOnInit() {

    this.words = this.msg.split(' ');

    // console.log(this.words);

    this.showNextWord();

  }

  showNextWord() {

    const word = this.words[this.currentIndex++];

    this.displayMessage += word + ' ';

    if(this.currentIndex < this.words.length) {
      this.setMyTimeout(this.showNextWord.bind(this),WORD_DELAY);
    } else {
      this.setMyTimeout(() => {
        this.messageComplete = true;
      }, 3000);

    }

  }

  setMyTimeout(fn: any, time: number) {
    setTimeout(fn, time);
  }


  next() {
    this.router.navigateByUrl('/t/focus');
  }

}
