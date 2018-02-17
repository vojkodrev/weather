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
export class OpenWeatherMapApiService {

  constructor(
    private http: HttpClient,
    private weatherApiOptions: OpenWeatherMapApiOptionsService) { }

  getCurrentWeatherByCityName(name: string) {
    return this.http.get<IWeatherInfo>("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        "q": name,
        "appid": this.weatherApiOptions.key,
        "units": this.weatherApiOptions.units
      }
    })
  }

  getCurrentWeatherByCoordinates(lat: number, lon: number) {
    return this.http.get<IWeatherInfo>("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        "lat": lat.toString(),
        "lon": lon.toString(),
        "appid": this.weatherApiOptions.key,
        "units": this.weatherApiOptions.units
      }
    })
  }

  getDailyForecastByCityName(name: string) {
    return this.http.get<IWeatherInfo>("http://api.openweathermap.org/data/2.5/forecast", {
      params: {
        "q": name,
        "cnt": "5",
        "appid": this.weatherApiOptions.key,
        "units": this.weatherApiOptions.units
      }
    })
  }

  getDailyForecastByCoordinates(lat: number, lon: number) {
    return this.http.get<IWeatherInfo>("http://api.openweathermap.org/data/2.5/forecast", {
      params: {
        "lat": lat.toString(),
        "lon": lon.toString(),
        "cnt": "5",
        "appid": this.weatherApiOptions.key,
        "units": this.weatherApiOptions.units
      }
    })
  }
}
