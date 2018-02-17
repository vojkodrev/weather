import { Injectable } from '@angular/core';

@Injectable()
export class OpenWeatherMapApiOptionsService {

  key: string;
  units: string = "metric";

  constructor() { }

}
