import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OpenWeatherMapApiOptionsService } from "../open-weather-map-api-options/open-weather-map-api-options.service";

export interface IWeatherInfoMain {
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface IWeatherInfoWeather {
  main: string;
}

export interface IWeatherInfoWind {
  speed: number;
}

export interface IWeatherInfoSys {
  sunrise: number;
  sunset: number;
}

export interface IWeatherInfo {
  main: IWeatherInfoMain;
  name: string;
  weather: IWeatherInfoWeather[];
  visibility: number;
  wind: IWeatherInfoWind;
  sys: IWeatherInfoSys;
}

@Injectable()
export class CurrentWeatherDataService {

  constructor(
    private http: HttpClient,
    private weatherApiOptions: OpenWeatherMapApiOptionsService) { }

  getDataByCityName(name: string) {
    return this.http.get<IWeatherInfo>("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        "q": name,
        "appid": this.weatherApiOptions.key,
        "units": this.weatherApiOptions.units
      }
    })
  }

  getDataByCoordinates(lat: number, lon: number) {
    return this.http.get<IWeatherInfo>("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        "lat": lat.toString(),
        "lon": lon.toString(),
        "appid": this.weatherApiOptions.key,
        "units": this.weatherApiOptions.units
      }
    })
  }

}
