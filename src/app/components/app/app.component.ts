import { Component } from '@angular/core';

import { NavigationBarOptionsService } from '../../services/navigation-bar-options/navigation-bar-options.service';
import { Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  localStorage = localStorage;

  constructor(
    private navigationBarOptionsService: NavigationBarOptionsService,
    private router: Router) {

    router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        console.log('NavigationEnd:', event);

        if (!localStorage.openWeatherMapApiKey && router.url != "/login") {
          router.navigateByUrl("login");
        }
      });

    if (localStorage.openWeatherMapApiKey)
      router.navigateByUrl("dashboard");
  }

  logout() {
    localStorage.removeItem("openWeatherMapApiKey");
    localStorage.removeItem("openWeatherMapUnits");
    localStorage.removeItem("username");
    this.router.navigateByUrl("login");
  }
}
