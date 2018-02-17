import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { NavigationVisibilityService } from '../../services/navigation-visibility/navigation-visibility.service';
import { OpenWeatherMapApiOptionsService } from "../../services/open-weather-map-api-options/open-weather-map-api-options.service";
import { GeoLocationService } from "../../services/geo-location/geo-location.service";
import { OpenWeatherMapApiService, ICurrentWeatherInfo, IForecastInfo, IForecastInfo3h } from "../../services/open-weather-map-api/open-weather-map-api.service";

import * as moment from 'moment';

import { List } from 'linqts';

export class DisplayableDailyWeatherInfo {
  dayOfWeek: string;
  dayOfMonth: number;
  humidity: number;
  highTemp: number;
  lowTemp: number;
  image: string;
  active: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentLocationError: boolean;
  getWeatherDataError: boolean;
  location: string;
  temperature: number;
  weather: string;
  wind: number;
  barometer: number;
  visibility: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  dailyData: DisplayableDailyWeatherInfo[] = new Array();

  constructor(
    private navigationVisibilityService: NavigationVisibilityService,
    private openWeatherMapApiOptionsService: OpenWeatherMapApiOptionsService,
    private router: Router,
    private geoLocationService: GeoLocationService,
    private openWeatherMapApiService: OpenWeatherMapApiService) {
      
    if (!openWeatherMapApiOptionsService.key) {
      router.navigateByUrl("login");
      return;
    }

    navigationVisibilityService.visible = true;
    
    this.getWeatherForCurrentLocation();
  }

  ngOnInit() {
  }

  formatTime(seconds: number) {
    return moment(seconds * 1000).format("LT");
  }

  getWeatherForCurrentLocation() {
    this.clearErrors();

    this.geoLocationService.getLocation().subscribe(
      position => {
        console.log(position);

        this.openWeatherMapApiService.getCurrentWeatherByCoordinates(position.coords.latitude, position.coords.longitude).subscribe(
          weatherData => {
            console.log("current weather data", weatherData);
            this.setCurrentWeatherData(weatherData);

            this.openWeatherMapApiService.getDailyForecastByCoordinates(position.coords.latitude, position.coords.longitude).subscribe(
              dailyDataResponse => {
                console.log("daily data", dailyDataResponse);

                this.setDailyData(dailyDataResponse);
              },
              error => this.getWeatherDataError = true);
          },
          error => this.getWeatherDataError = true);
      },
      error => this.currentLocationError = true);
  }

  setDailyData(dailyDataResponse: IForecastInfo) {
    this.dailyData = new Array();
    let groupsByDay = new List(dailyDataResponse.list).GroupBy(i => moment(i.dt * 1000).format("YYYYMMDD"), i => i);
    for (let key in groupsByDay) {
      let displayableDay = new DisplayableDailyWeatherInfo();
      this.dailyData.push(displayableDay);

      let day = new List<IForecastInfo3h>(groupsByDay[key]);
      let m = moment(key, "YYYYMMDD");

      displayableDay.lowTemp = Math.round(day.Select(i => i.main.temp_min).Min());
      displayableDay.highTemp = Math.round(day.Select(i => i.main.temp_max).Max());
      displayableDay.dayOfWeek = m.format("ddd");
      displayableDay.dayOfMonth = parseInt(m.format("D"));
      displayableDay.humidity = Math.round(day.Select(i => i.main.humidity).Max());
      displayableDay.image = this.getKeyWithMaxElements(day.GroupBy(i => i.weather[0].main, i => i));
    }
    this.dailyData[0].active = true;
  }

  getKeyWithMaxElements(dict: {[key: string]: any[]}): string {
    let max = -1;
    let result = "";

    for (let key in dict) {
      let l = dict[key].length;

      if (l > max) {
        max = l;
        result = key;
      }
    }

    return result;
  }

  getWeatherForLocation() {
    this.clearErrors();

    if (!this.location)
      return;

    this.openWeatherMapApiService.getCurrentWeatherByCityName(this.location).subscribe(
      weatherData => {
        console.log(weatherData);
        this.setCurrentWeatherData(weatherData);

        this.openWeatherMapApiService.getDailyForecastByCityName(this.location).subscribe(
          dailyDataResponse => {
            console.log("daily data", dailyDataResponse);

            this.setDailyData(dailyDataResponse);
          },
          error => this.getWeatherDataError = true);
      },
      error => this.getWeatherDataError = true
    );
  }

  switchUnits() {
    if (this.openWeatherMapApiOptionsService.units == "metric") {
      this.openWeatherMapApiOptionsService.units = "imperial";
    } else {
      this.openWeatherMapApiOptionsService.units = "metric";
    }

    this.getWeatherForLocation();
  }

  onLocationKeyUp(event: KeyboardEvent) {
    if (event.code == "Enter") {
      this.getWeatherForLocation();
    }
  }

  setCurrentWeatherData(weatherData: ICurrentWeatherInfo) {
    this.temperature = Math.round(weatherData.main.temp);
    this.location = weatherData.name;
    this.weather = weatherData.weather[0].main;
    this.wind = weatherData.wind.speed;
    this.barometer = weatherData.main.pressure;
    this.visibility = weatherData.visibility / 1000;
    this.humidity = weatherData.main.humidity;
    this.sunrise = this.formatTime(weatherData.sys.sunrise);
    this.sunset = this.formatTime(weatherData.sys.sunset);
  }

  clearErrors() {
    this.currentLocationError = false;
    this.getWeatherDataError = false;
  }

}
