import { TestBed, inject } from '@angular/core/testing';

import { ParticipantAdminService } from './participant-admin.service';

describe('ParticipantAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipantAdminService]
    });
  });

  it('should be created', inject([ParticipantAdminService], (service: ParticipantAdminService) => {
    expect(service).toBeTruthy();
  }));
});
