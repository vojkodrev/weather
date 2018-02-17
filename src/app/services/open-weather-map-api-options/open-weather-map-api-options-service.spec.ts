import { TestBed, inject } from '@angular/core/testing';

import { OpenWeatherMapApiOptionsService } from './open-weather-map-api-options.service';

describe('OpenWeatherMapApiKeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenWeatherMapApiOptionsService]
    });
  });

  it('should be created', inject([OpenWeatherMapApiOptionsService], (service: OpenWeatherMapApiOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
