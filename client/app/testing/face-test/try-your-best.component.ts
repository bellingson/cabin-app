import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-try-your-best',
  templateUrl: './try-your-best.component.html',
  styleUrls: ['./try-your-best.component.scss']
})
export class TryYourBestComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next() {
    this.router.navigateByUrl('/t/focus');
  }

}
