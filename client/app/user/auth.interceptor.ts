import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';


import {UserService} from "./user.service";
import {User} from "./user.model";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.log('auth intercept');

    const token = this.authService.getToken();

    // console.log('token: ' + token);

    if(token == null) {
      return next.handle(req);
    }

    const authReq = req.clone({headers: req.headers.set('Authorization', token)});

    return next.handle(authReq);
  }


}
