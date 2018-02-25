import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestAdminService } from './test-admin.service';

describe('TestAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestAdminService],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([TestAdminService], (service: TestAdminService) => {
    expect(service).toBeTruthy();
  }));
});
