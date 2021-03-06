
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {TestService} from "./test.service";

import {UserService} from "../user/user.service";
import {UserServiceMock} from "../user/user.service.mock";
import {AuthService} from "../user/auth.service";

// import {ActivatedRouteMock, RouterMock} from "./router.mock";

import { HttpClientTestingModule } from '@angular/common/http/testing';

import {TestDataService} from "./test-data.service";

import {TestDataServiceMock, testOptions} from "./test-data.service.mock";


export const OK = { message: 'ok' };

export const testProviders = [

  AuthService,
  { provide: UserService, useClass: UserServiceMock },
  { provide: TestService, useFactory: (userService: UserService) => {
      const testService = new TestService(userService);
      testService.options.next(testOptions);
      return testService;
    }, deps: [ UserService ]
  },
  { provide: TestDataService, useClass: TestDataServiceMock }

  /*
  { provide: Router, useClass: RouterMock },
  { provide: ActivatedRoute, useClass: ActivatedRouteMock }
  */
];


export const testImports = [

  RouterTestingModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientTestingModule

];
