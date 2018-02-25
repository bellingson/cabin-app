
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


import {AuthService} from "../testing/user/auth.service";
import {UserService} from "../testing/user/user.service";
import {UserServiceMock} from "../testing/user/user.service.mock";
import {TestService} from "../testing/face-test/test.service";
import {TestDataServiceMock, testOptions} from "../testing/face-test/test-data.service.mock";
import {TestDataService} from "../testing/face-test/test-data.service";
import {TestAdminService} from "./test-admin.service";
import {TestAdminServiceMock} from "./test-admin.service.mock";
import {ParticipantAdminService} from "./participant-admin.service";
import {ParticipantAdminDataService} from "./participant-admin-data.service";
import {ParticipantAdminDataServiceMock} from "./participant-admin-data.service.mock";


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
  { provide: TestDataService, useClass: TestDataServiceMock },
  { provide: TestAdminService, useClass: TestAdminServiceMock },
  { provide: ParticipantAdminService, useClass: ParticipantAdminService },
  { provide: ParticipantAdminDataService, useClass: ParticipantAdminDataServiceMock }
  /*
  { provide: Router, useClass: RouterMock },
  { provide: ActivatedRoute, useClass: ActivatedRouteMock }
  */
];


export const testImports = [

  RouterTestingModule,
  FormsModule,
  ReactiveFormsModule
];
