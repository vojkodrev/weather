import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { UserInfoComponent } from './components/user-info/user-info.component';

import { NavigationVisibilityService } from './services/navigation-visibility/navigation-visibility.service';
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
    NgbModule.forRoot()
  ],
  providers: [
    NavigationVisibilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
