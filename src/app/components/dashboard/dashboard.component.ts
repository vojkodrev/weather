import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { NavigationVisibilityService } from '../../services/navigation-visibility/navigation-visibility.service';
import { OpenWeatherMapApiOptionsService } from "../../services/open-weather-map-api-options/open-weather-map-api-options.service";
import { GeoLocationService } from "../../services/geo-location/geo-location.service";
import { CurrentWeatherDataService, IWeatherInfo } from "../../services/current-weather-data/current-weather-data.service";

import * as moment from 'moment';

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

  constructor(
    private navigationVisibilityService: NavigationVisibilityService,
    private openWeatherMapApiOptionsService: OpenWeatherMapApiOptionsService,
    private router: Router,
    private geoLocationService: GeoLocationService,
    private currentWeatherDataService: CurrentWeatherDataService) {
      
    if (!openWeatherMapApiOptionsService.key) {
      router.navigateByUrl("login");
      return;
    }

    navigationVisibilityService.visible = true;
    
    this.getWeatherForCurrentLocation();
  }

  ngOnInit() {
  }

  formatDateTime(seconds: number) {
    return moment(seconds * 1000).format("LT");
  }

  getWeatherForCurrentLocation() {
    this.clearErrors();

    this.geoLocationService.getLocation().subscribe(
      position => {
        console.log(position);

        this.currentWeatherDataService.getDataByCoordinates(position.coords.latitude, position.coords.longitude).subscribe(
          weatherData => {
            console.log(weatherData);
            this.setWeatherData(weatherData);
          },
          error => this.getWeatherDataError = true
        );
      },
      error => this.currentLocationError = true);
  }

  getWeatherForLocation() {
    this.clearErrors();

    if (!this.location)
      return;

    this.currentWeatherDataService.getDataByCityName(this.location).subscribe(
      weatherData => {
        console.log(weatherData);
        this.setWeatherData(weatherData);
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

  setWeatherData(weatherData: IWeatherInfo) {
    this.temperature = Math.round(weatherData.main.temp);
    this.location = weatherData.name;
    this.weather = weatherData.weather[0].main;
    this.wind = weatherData.wind.speed;
    this.barometer = weatherData.main.pressure;
    this.visibility = weatherData.visibility / 1000;
    this.humidity = weatherData.main.humidity;
    this.sunrise = this.formatDateTime(weatherData.sys.sunrise);
    this.sunset = this.formatDateTime(weatherData.sys.sunset);
  }

  clearErrors() {
    this.currentLocationError = false;
    this.getWeatherDataError = false;
  }

}
