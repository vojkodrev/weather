import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavigationVisibilityService } from './services/navigation-visibility/navigation-visibility.service';
import { CurrentWeatherDataService } from './services/current-weather-data/current-weather-data.service';
import { OpenWeatherMapApiOptionsService } from './services/open-weather-map-api-options/open-weather-map-api-options.service';
import { GeoLocationService } from './services/geo-location/geo-location.service';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardWeatherListItemComponent } from './components/dashboard-weather-list-item/dashboard-weather-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserInfoComponent,
    DashboardComponent,
    DashboardWeatherListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    NavigationVisibilityService,
    CurrentWeatherDataService,
    OpenWeatherMapApiOptionsService,
    GeoLocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
