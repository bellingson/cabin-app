import { TestBed, inject } from '@angular/core/testing';

import { TestDataService } from './test-data.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestDataService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([TestDataService], (service: TestDataService) => {
    expect(service).toBeTruthy();
  }));
});
