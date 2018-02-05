import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import {UserService} from "./user.service";

@Component({
  selector: 'app-app-init',
  templateUrl: './app-init.component.html',
  styleUrls: ['./app-init.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppInitComponent implements OnInit {

    constructor(private userService: UserService,
                private router: Router) {}

    ngOnInit() {

        console.log('app init');

        let user;
        this.userService.user.subscribe(_user => user = _user);
        if(user == null) {
            this.router.navigateByUrl('/t/user-init');
        } else {
            this.router.navigateByUrl('/t/pre-test');
        }


    }

}
