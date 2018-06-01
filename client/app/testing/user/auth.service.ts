import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs';

const TOKEN_KEY = 'token';

@Injectable()
export class AuthService {

  token =  new ReplaySubject<string>(1);

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

    // 1000 milli, 60 seconds, 60 minutes * 24 hours * 365 days * 10 years
    let expire = new Date(Date.now() + (1000 * 60 * 60 * 24 * 365 * 10)).toUTCString();
    document.cookie = `auth=${token}; expires=${expire}; path=/`;

     this.token.next(token);
  }

  getToken() : string {

    let _token;
    this.token.subscribe(t => _token = t);

    return _token;
  }


}
