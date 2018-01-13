import { TestBed, inject } from '@angular/core/testing';

import { TestAdminService } from './test-admin.service';

describe('TestAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestAdminService]
    });
  });

  it('should be created', inject([TestAdminService], (service: TestAdminService) => {
    expect(service).toBeTruthy();
  }));
});
