import { Component } from '@angular/core';

import { NavigationBarOptionsService } from '../../services/navigation-bar-options/navigation-bar-options.service';
import { Router, NavigationEnd } from '@angular/router';
import { OpenWeatherMapApiOptionsService } from '../../services/open-weather-map-api-options/open-weather-map-api-options.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    private navigationBarOptionsService: NavigationBarOptionsService,
    private openWeatherMapApiOptionsService: OpenWeatherMapApiOptionsService,
    private router: Router) {

    router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        console.log('NavigationEnd:', event);

        if (!openWeatherMapApiOptionsService.key && router.url != "/login") {
          router.navigateByUrl("login");
        }
      });
  }

  logout() {
    this.openWeatherMapApiOptionsService.key = undefined;
    this.router.navigateByUrl("login");
  }
}
