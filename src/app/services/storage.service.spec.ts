import { TestBed } from '@angular/core/testing';

import { WeatherStorageService } from './weather-storage.service';

describe('StorageService', () => {
  let service: WeatherStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
