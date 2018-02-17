import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { NavigationVisibilityService } from '../../services/navigation-visibility/navigation-visibility.service';
import { OpenWeatherMapApiOptionsService } from "../../services/open-weather-map-api-options/open-weather-map-api-options.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private navigationVisibilityService: NavigationVisibilityService,
    private openWeatherMapApiOptionsService: OpenWeatherMapApiOptionsService,
    private router: Router) {
      
    if (!openWeatherMapApiOptionsService.key) {
      router.navigateByUrl("login");
      return;
    }

    navigationVisibilityService.visible = true;
  }

  ngOnInit() {
  }

}
