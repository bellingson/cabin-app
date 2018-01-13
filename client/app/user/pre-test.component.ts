import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "./user.model";
import {UserService} from "./user.service";

@Component({
  selector: 'app-pre-test',
  templateUrl: './pre-test.component.html',
  styleUrls: ['./pre-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreTestComponent implements OnInit {

  user: User;

  constructor(userService: UserService) {
     userService.user.subscribe(user => this.user = user);
  }

  ngOnInit() {


  }

}
