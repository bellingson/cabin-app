import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import {UserService} from "./user.service";

@Component({
  selector: 'app-user-init',
  templateUrl: './user-init.component.html',
  styleUrls: ['./user-init.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserInitComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {

      console.log('user init');
  }

    submit(value) {

       this.userService.createPatient(value.patientNumber);

       this.router.navigateByUrl('/pre-test');

    }

}
