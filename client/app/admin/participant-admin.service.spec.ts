import { TestBed, inject } from '@angular/core/testing';

import { ParticipantAdminService } from './participant-admin.service';
import {testImports} from "./test-admin.helper.spec";


describe('ParticipantAdminService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipantAdminService],
      imports: testImports

    });
  });

  it('should be created', inject([ParticipantAdminService], (service: ParticipantAdminService) => {
    expect(service).toBeTruthy();
  }));


});
