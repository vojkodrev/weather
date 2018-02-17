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

export interface ICurrentWeatherInfoWeather {
  main: string;
}

export interface ICurrentWeatherInfoWind {
  speed: number;
}

export interface ICurrentWeatherInfoSys {
  sunrise: number;
  sunset: number;
}

export interface ICurrentWeatherInfo {
  main: IWeatherInfoMain;
  name: string;
  weather: ICurrentWeatherInfoWeather[];
  visibility: number;
  wind: ICurrentWeatherInfoWind;
  sys: ICurrentWeatherInfoSys;
}

export interface IForecastInfoMain {
  temp_min: number;
  temp_max: number;
  humidity: number;
}

export interface IForecastInfoWeather {
  main: string;
}

export interface IForecastInfo3h {
  dt: number;
  main: IForecastInfoMain;
  weather: IForecastInfoWeather[];
}

export interface IForecastInfo {
  list: IForecastInfo3h[];
}

@Injectable()
export class OpenWeatherMapApiService {

  constructor(
    private http: HttpClient,
    private weatherApiOptions: OpenWeatherMapApiOptionsService) { }

  getCurrentWeatherByCityName(name: string) {
    return this.http.get<ICurrentWeatherInfo>("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        "q": name,
        "appid": this.weatherApiOptions.key,
        "units": this.weatherApiOptions.units
      }
    })
  }

  getCurrentWeatherByCoordinates(lat: number, lon: number) {
    return this.http.get<ICurrentWeatherInfo>("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        "lat": lat.toString(),
        "lon": lon.toString(),
        "appid": this.weatherApiOptions.key,
        "units": this.weatherApiOptions.units
      }
    })
  }

  getDailyForecastByCityName(name: string) {
    return this.http.get<IForecastInfo>("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        "q": name,
        "appid": this.weatherApiOptions.key,
        "units": this.weatherApiOptions.units
      }
    })
  }

  getDailyForecastByCoordinates(lat: number, lon: number) {
    return this.http.get<IForecastInfo>("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        "lat": lat.toString(),
        "lon": lon.toString(),
        "appid": this.weatherApiOptions.key,
        "units": this.weatherApiOptions.units
      }
    })
  }
}
