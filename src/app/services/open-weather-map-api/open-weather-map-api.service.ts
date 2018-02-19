import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  deg:number;
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
  temp: number;
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
    private http: HttpClient) { }

  getCurrentWeatherByCityName(name: string) {
    return this.http.get<ICurrentWeatherInfo>("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        "q": name,
        "appid": localStorage.openWeatherMapApiKey,
        "units": localStorage.openWeatherMapUnits
      }
    })
  }

  getCurrentWeatherByCoordinates(lat: number, lon: number) {
    return this.http.get<ICurrentWeatherInfo>("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        "lat": lat.toString(),
        "lon": lon.toString(),
        "appid": localStorage.openWeatherMapApiKey,
        "units": localStorage.openWeatherMapUnits
      }
    })
  }

  getDailyForecastByCityName(name: string) {
    return this.http.get<IForecastInfo>("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        "q": name,
        "appid": localStorage.openWeatherMapApiKey,
        "units": localStorage.openWeatherMapUnits
      }
    })
  }

  getDailyForecastByCoordinates(lat: number, lon: number) {
    return this.http.get<IForecastInfo>("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        "lat": lat.toString(),
        "lon": lon.toString(),
        "appid": localStorage.openWeatherMapApiKey,
        "units": localStorage.openWeatherMapUnits
      }
    })
  }
}
