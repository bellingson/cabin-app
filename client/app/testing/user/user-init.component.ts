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

  message: string;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {

      // console.log('user init');

  }

    submit(value) {

       this.userService.createParticipant(value.participantId, value.pin)
         .subscribe(r => {
            this.router.navigateByUrl('/t/pre-test');
          }, err => {
           console.log(err);

            if(err.status == 401) {
               this.message = 'Invalid PIN';
               return;
            }

            this.message = 'Request failed';
         });

    }

}
