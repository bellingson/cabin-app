
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {TestService} from "./test.service";
import {TestServiceMock} from "./test.service.mock";
import {UserService} from "../user/user.service";
import {UserServiceMock} from "../user/user.service.mock";
import {AuthService} from "../user/auth.service";
import {ActivatedRouteMock, RouterMock} from "./router.mock";

export const testProviders = [

  AuthService,
  { provide: UserService, useClass: UserServiceMock },
  { provide: TestService, useClass: TestServiceMock },
  { provide: Router, useClass: RouterMock },
  { provide: ActivatedRoute, useClass: ActivatedRouteMock }
];


export const testImports = [
  RouterTestingModule,
  FormsModule,
  ReactiveFormsModule

];
