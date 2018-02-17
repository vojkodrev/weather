import { TestBed, inject } from '@angular/core/testing';

import { OpenWeatherMapApiService } from './open-weather-map-api.service';

describe('CurrentWeatherDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenWeatherMapApiService]
    });
  });

  it('should be created', inject([OpenWeatherMapApiService], (service: OpenWeatherMapApiService) => {
    expect(service).toBeTruthy();
  }));
});
