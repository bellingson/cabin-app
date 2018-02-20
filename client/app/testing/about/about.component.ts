import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signOut() {

    if(!confirm("Are you sure you want to sign out?"))
      return;

    this.router.navigateByUrl('/clear');

  }

}
