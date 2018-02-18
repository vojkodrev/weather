import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';

import { NavigationBarOptionsService } from '../../services/navigation-bar-options/navigation-bar-options.service';
import { OpenWeatherMapApiService, ICurrentWeatherInfo } from '../../services/open-weather-map-api/open-weather-map-api.service';
import { OpenWeatherMapApiOptionsService } from "../../services/open-weather-map-api-options/open-weather-map-api-options.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  key: string;
  hasErrors: boolean;

  constructor(
    private navigationBarOptionsService: NavigationBarOptionsService,
    private openWeatherMapApiService: OpenWeatherMapApiService,
    private openWeatherMapApiOptionsService: OpenWeatherMapApiOptionsService,
    private router: Router) {

    navigationBarOptionsService.visible = false;
    this.key = "e80e15a63f2344aa1d6e4d6ea2d2ea6e";
  }

  ngOnInit() {
  }

  onSubmit() {
    this.hasErrors = false;
    this.openWeatherMapApiOptionsService.key = this.key;
    
    this.openWeatherMapApiService.getCurrentWeatherByCityName("Bangkok").subscribe(
      data => this.router.navigateByUrl("dashboard"),
      error => this.hasErrors = true);
  }
}
