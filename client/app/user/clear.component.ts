import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {UserService} from "./user.service";

@Component({
  selector: 'app-clear',
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.scss']
})
export class ClearComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {

     localStorage.clear();

     document.location.href = '';

  }

}
