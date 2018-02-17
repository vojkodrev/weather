import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { NavigationVisibilityService } from '../../services/navigation-visibility/navigation-visibility.service';
import { OpenWeatherMapApiOptionsService } from "../../services/open-weather-map-api-options/open-weather-map-api-options.service";
import { GeoLocationService } from "../../services/geo-location/geo-location.service";
import { CurrentWeatherDataService } from "../../services/current-weather-data/current-weather-data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentLocationError: boolean;
  getWeatherDataError: boolean;
  location: string;

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

  getWeatherForCurrentLocation() {
    this.clearErrors();

    this.geoLocationService.getLocation().subscribe(
      position => {
        console.log(position);

        this.currentWeatherDataService.getDataByCoordinates(position.coords.latitude, position.coords.longitude).subscribe(
          weatherData => {
            console.log(weatherData);
            this.location = weatherData.name;
          },
          error => this.getWeatherDataError = true
        );
      },
      error => this.currentLocationError = true);
  }

  clearErrors() {
    this.currentLocationError = false;
    this.getWeatherDataError = false;
  }

}
