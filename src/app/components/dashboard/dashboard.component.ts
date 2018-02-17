import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { NavigationVisibilityService } from '../../services/navigation-visibility/navigation-visibility.service';
import { OpenWeatherMapApiOptionsService } from "../../services/open-weather-map-api-options/open-weather-map-api-options.service";
import { GeoLocationService } from "../../services/geo-location/geo-location.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  locationError:boolean;

  constructor(
    private navigationVisibilityService: NavigationVisibilityService,
    private openWeatherMapApiOptionsService: OpenWeatherMapApiOptionsService,
    private router: Router,
    private geoLocationService: GeoLocationService) {
      
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
    this.locationError = false;
    this.geoLocationService.getLocation().subscribe(
      position => console.log(position),
      error => this.locationError = true);
  }

}
