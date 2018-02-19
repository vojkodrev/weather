import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationBarOptionsService } from './services/navigation-bar-options/navigation-bar-options.service';
import { OpenWeatherMapApiService } from './services/open-weather-map-api/open-weather-map-api.service';
import { GeoLocationService } from './services/geo-location/geo-location.service';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardWeatherListItemComponent } from './components/dashboard-weather-list-item/dashboard-weather-list-item.component';
import { HttpCachingInterceptor } from './interceptors/http-caching-interceptor/http-caching.interceptor';
import { DashboardContentHolderComponent } from './components/dashboard-content-holder/dashboard-content-holder.component';
import { DashboardFieldComponent } from './components/dashboard-field/dashboard-field.component';
import { HttpCacheService } from './services/http-cache/http-cache.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserInfoComponent,
    DashboardComponent,
    DashboardWeatherListItemComponent,
    DashboardContentHolderComponent,
    DashboardFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    NavigationBarOptionsService,
    OpenWeatherMapApiService,
    GeoLocationService,
    HttpCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpCachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
