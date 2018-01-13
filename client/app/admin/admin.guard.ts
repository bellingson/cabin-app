import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";


@Injectable()
export class AdminGuard implements CanActivate {

  user: User;

  constructor(userService: UserService,
              private router: Router) {

    userService.user.subscribe(user => this.user = user);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.user == null) {
      this.redirectToHome();
      return false;
    }

    // admin
    if(this.user.patientId == '-1') {
      return true;
    }

    this.redirectToHome();

    return false;
  }

  redirectToHome() {
     console.log('redirecting home')
     this.router.navigateByUrl('/');
  }



}
