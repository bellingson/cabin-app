
import { RouterTestingModule } from '@angular/router/testing';

import {TestService} from "./test.service";
import {TestServiceMock} from "./test.service.mock";
import {UserService} from "../user/user.service";
import {UserServiceMock} from "../user/user.service.mock";

export const testProviders = [

  { provide: UserService, useClass: UserServiceMock },
  { provide: TestService, useClass: TestServiceMock }

];


export const testImports = [
  RouterTestingModule
];
