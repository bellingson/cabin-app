import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "./auth.service";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService,
                  AuthService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
