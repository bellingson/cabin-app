import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

const TOKEN_KEY = 'token';

@Injectable()
export class AuthService {

  private token =  new ReplaySubject<string>(1);

  constructor() {
     this.initialize();
  }

  private initialize() {

    this.token.subscribe(_token => {

      if(_token == null) {
        localStorage.removeItem(TOKEN_KEY);
      } else {
        localStorage.setItem(TOKEN_KEY, _token);
      }

    });

    let _token = localStorage.getItem(TOKEN_KEY);
    this.token.next(_token);

  }

  setToken(token: string) {

     document.cookie = `auth=${token}`;

     this.token.next(token);
  }

  getToken() : string {

    let _token;
    this.token.subscribe(t => _token = t);

    return _token;
  }


}