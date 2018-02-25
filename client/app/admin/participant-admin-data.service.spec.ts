import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ParticipantAdminDataService } from './participant-admin-data.service';

describe('ParticipantAdminDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipantAdminDataService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([ParticipantAdminDataService], (service: ParticipantAdminDataService) => {
    expect(service).toBeTruthy();
  }));
});
