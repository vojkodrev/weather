import { Component, OnInit } from '@angular/core';

import { NavigationBarOptionsService } from '../../services/navigation-bar-options/navigation-bar-options.service';
import { HttpCacheService } from '../../services/http-cache/http-cache.service';
import { List } from 'linqts';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  cacheInvalidationTime: number;
  openWeatherMapApiKey: string;
  username: string;
  numberOfApiCallsInLast10min: number;

  constructor(
    private navigationBarOptionsService: NavigationBarOptionsService,
    private httpCacheService: HttpCacheService) {

    navigationBarOptionsService.visible = true;
    navigationBarOptionsService.selected = "userInfo";

    this.populateFields();
  }

  populateFields() {
    this.cacheInvalidationTime = localStorage.cacheInvalidationTime;
    this.openWeatherMapApiKey = localStorage.openWeatherMapApiKey;
    this.username = localStorage.username;

    this.countNumberOfApiCallsInLast10Min();
  }

  countNumberOfApiCallsInLast10Min() {
    let counter = 0;
    for (let key in this.httpCacheService.cache) {
      if (((new Date).getTime() - this.httpCacheService.cache[key].time) < 600000) {
        counter++;
      }
    }

    this.numberOfApiCallsInLast10min = counter;
  }

  clearApiCache() {
    this.httpCacheService.cache = {};

    this.countNumberOfApiCallsInLast10Min();
  }

  confirm() {
    localStorage.cacheInvalidationTime = this.cacheInvalidationTime;
    localStorage.openWeatherMapApiKey = this.openWeatherMapApiKey;
    localStorage.username = this.username;
  }

  ngOnInit() {
  }

}
