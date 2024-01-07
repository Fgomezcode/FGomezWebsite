import { TestBed } from '@angular/core/testing';

import { TriviaAPIService } from './trivia-api.service';

describe('TriviaAPIService', () => {
  let service: TriviaAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriviaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
