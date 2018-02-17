import { TestBed, inject } from '@angular/core/testing';

import { CurrentWeatherDataService } from './current-weather-data.service';

describe('CurrentWeatherDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentWeatherDataService]
    });
  });

  it('should be created', inject([CurrentWeatherDataService], (service: CurrentWeatherDataService) => {
    expect(service).toBeTruthy();
  }));
});
