import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pre-test',
  templateUrl: './pre-test.component.html',
  styleUrls: ['./pre-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      console.log('pre test');
  }

}
