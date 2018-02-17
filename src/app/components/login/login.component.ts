import { Component, OnInit } from '@angular/core';

import { NavigationVisibilityService } from '../../services/navigation-visibility/navigation-visibility.service';
import { CurrentWeatherDataService, IWeatherInfo } from '../../services/current-weather-data/current-weather-data.service';
import { OpenWeatherMapApiOptionsService } from "../../services/open-weather-map-api-options/open-weather-map-api-options.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  key: string;

  constructor(
    private navigationVisibilityService: NavigationVisibilityService,
    private currentWeatherDataService: CurrentWeatherDataService,
    private openWeatherMapApiOptionsService: OpenWeatherMapApiOptionsService) {

    navigationVisibilityService.visible = false;

    this.key = "e80e15a63f2344aa1d6e4d6ea2d2ea6e";
  }

  ngOnInit() {
  }

  onSubmit() {
    this.openWeatherMapApiOptionsService.key = this.key;
    
    this.currentWeatherDataService.getDataByCityName("Bangkok").subscribe(
      data => alert("login ok"),
      error => {
        alert("Login failed (" + error.error.cod + ")\n" + error.error.message)
      });
  }

}
