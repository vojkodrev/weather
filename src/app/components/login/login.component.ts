import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';

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

  @ViewChild('submitPopover') public submitPopover: NgbPopover;

  constructor(
    private navigationVisibilityService: NavigationVisibilityService,
    private currentWeatherDataService: CurrentWeatherDataService,
    private openWeatherMapApiOptionsService: OpenWeatherMapApiOptionsService,
    private router: Router) {

    navigationVisibilityService.visible = false;
    this.key = "e80e15a63f2344aa1d6e4d6ea2d2ea6e";
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitPopover.close();
    this.openWeatherMapApiOptionsService.key = this.key;
    
    this.currentWeatherDataService.getDataByCityName("Bangkok").subscribe(
      data => this.router.navigateByUrl("dashboard"),
      error => {
        this.submitPopover.open({
          message: error.error.message,
          code: error.error.cod
        });
      });
  }

}
