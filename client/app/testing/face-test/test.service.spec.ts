import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestService } from './test.service';
import {UserService} from "../user/user.service";
import {UserServiceMock} from "../user/user.service.mock";

import * as moment from 'moment';
import {TestSession} from "./test-session.model";
import {AuthService} from "../user/auth.service";


describe('TestService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [TestService,
        { provide: UserService, useClass: UserServiceMock },
        AuthService
      ]
    });
  });

  it('should be created', inject([TestService], (service: TestService) => {
    expect(service).toBeTruthy();
  }));


  it('should checkTestLevel', inject([TestService, UserService], (service: TestService, userService: UserServiceMock) => {

    let user;
    userService.user.subscribe(_user => user = _user);

    let startTime = moment().add(-13, 'days');

    console.log('st: ' + startTime.toDate());

    user.startTime = startTime.valueOf();

    let level = service.checkTestLevel();

    expect(level).toBe(1);

    startTime = moment().add(-14, 'days');

    console.log('st: ' + startTime.toDate());

    user.startTime = startTime.valueOf();

    level = service.checkTestLevel();

    expect(level).toBe(2);

  }));

  it('countStats', inject([TestService, UserService], (service: TestService, userService: UserServiceMock) => {

    let user;
    userService.user.subscribe(_user => user = _user);

    let startTime = moment().add(-21, 'days');
    startTime.hours(10);
    user.startTime = startTime.valueOf();

    let sessions = createTestSessions();

    console.log('CTS: ' )

    service.testSessions.next(sessions);

    let stats = service.countStats();

    expect(stats).toBeTruthy();
    expect(stats.sessionsThisWeek).toBe(10);

  }));

  function createTestSessions() : Array<TestSession> {

    let sessions = [];

    for(let i=0;i<10;i++) {

      let testSession = { } as TestSession;
      let startTime = moment().add(i,'hours');

      testSession.startTime = startTime.valueOf();
      testSession.level = 1;
      testSession.sampleCount = 5;
      testSession.correctCount = 3;
      testSession.incorrectCount = 2;
      testSession.percentCorrect = '60';

      sessions.push(testSession);
    }

    return sessions;

  }


});
