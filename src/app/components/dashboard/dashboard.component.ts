import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NavigationBarOptionsService } from '../../services/navigation-bar-options/navigation-bar-options.service';
import { GeoLocationService } from "../../services/geo-location/geo-location.service";
import { OpenWeatherMapApiService, ICurrentWeatherInfo, IForecastInfo, IForecastInfo3h } from "../../services/open-weather-map-api/open-weather-map-api.service";

import * as moment from 'moment';

import {Chart, ChartPoint} from "chart.js";

import "chartjs-plugin-datalabels";

import { List } from 'linqts';
import { DomSanitizer, SafeUrl, SafeStyle } from '@angular/platform-browser';

export class DisplayableDailyWeatherInfo {
  dayOfWeek: string;
  dayOfMonth: number;
  humidity: number;
  highTemp: number;
  lowTemp: number;
  image: string;
  active: boolean;
  chartValues: number[] = new Array();
  chartLabels: string[] = new Array();
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentLocationError: boolean;
  getWeatherDataError: boolean;
  location: string;
  temperature: number;
  weather: string;
  wind: number;
  windDeg: number;
  barometer: number;
  visibility: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  dailyData: DisplayableDailyWeatherInfo[] = new Array();
  images: {[weather: string]: SafeStyle};
  localStorage = localStorage;

  @ViewChild("chart") chart: ElementRef;

  constructor(
    private navigationBarOptionsService: NavigationBarOptionsService,
    private geoLocationService: GeoLocationService,
    private openWeatherMapApiService: OpenWeatherMapApiService,
    private sanitizer: DomSanitizer) {

    this.images = {
      "Clouds": sanitizer.bypassSecurityTrustStyle("url('https://www.walldevil.com/wallpapers/a50/sky-wallpapers-sunny-pixel-paper-clouds-weather-wallpaper-large-rainbow.jpg')"),
      "Sun": sanitizer.bypassSecurityTrustStyle("url('https://essexweather.org.uk/content/images/2018/02/local-2.jpg')"),
      "Rain": sanitizer.bypassSecurityTrustStyle("url('http://www.ehowzit.co.za/wp-content/uploads/2016/07/rainy-weather.jpg')"),
      "Snow": sanitizer.bypassSecurityTrustStyle("url('https://wagfarms.files.wordpress.com/2013/01/005.jpg')"),
      "Clear": sanitizer.bypassSecurityTrustStyle("url('https://yim108.files.wordpress.com/2012/02/img_8715.jpg')"),
      "Mist": sanitizer.bypassSecurityTrustStyle("url('https://theweatherclub.org.uk/sites/default/files/Andrew%20Bailey%20-%20Freezing%20Fog%20and%20Hoar%20Frost%20%283rd%20place%2C%20over%2016s%29%20-%20SMALL_0.jpg')"),
      "Fog": sanitizer.bypassSecurityTrustStyle("url('https://theweatherclub.org.uk/sites/default/files/Andrew%20Bailey%20-%20Freezing%20Fog%20and%20Hoar%20Frost%20%283rd%20place%2C%20over%2016s%29%20-%20SMALL_0.jpg')"),
      "Default": sanitizer.bypassSecurityTrustStyle("url('http://www.flitemedia.com/wp-content/uploads/2015/06/NLC-Panorama-3rd-July-2014-3-49am.jpg')"),
      "Haze": sanitizer.bypassSecurityTrustStyle("url('https://www.thenational.ae/image/policy:1.704756:1518668101/weather.JPG?f=16x9&w=1200&$p$f$w=4343fc7')"),
    };

    navigationBarOptionsService.visible = true;
    navigationBarOptionsService.selected = "dashboard";

    this.getWeatherForCurrentLocation();
  }

  ngOnInit() {

  }

  drawChartAndActivate(info: DisplayableDailyWeatherInfo) {
    this.dailyData.forEach(i => i.active = undefined);
    info.active = true;

    // console.log(this.chart);

    let ctx = (<HTMLCanvasElement> this.chart.nativeElement).getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: info.chartLabels,// ["2", "3", "4", "5"],
        datasets: [{
          borderColor:"white",
          pointBackgroundColor: "white",
          backgroundColor: "rgba(100, 116, 137, 0.5)",
          fill: "start",
          borderWidth: 1,
          data: info.chartValues,//[4, 2, 3, 1],
        }]
      },
      options: {
        animation: {
          duration: 0,
        },
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 2
          },
          line: {
            tension: 0
          }
        },
        layout: {
          padding: {
            top: 20,
          },
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: "rgba(255, 255, 255, 0.6)",
              fontFamily: "Segoe UI",
              fontSize: 15,
            },
            gridLines : {
              display : false,
              color: "white",
              lineWidth: 1
            }
          }],
          yAxes: [{
            ticks: {
              fontColor: "rgba(255, 255, 255, 0.6)",
              fontFamily: "Segoe UI",
              fontSize: 0,
              min: new List(info.chartValues).Min() - 1,
              max: new List(info.chartValues).Max() + 1,
            },
            gridLines : {
              display : false,
              color: "rgba(0,0,0,0)",
              lineWidth: 0
            }
          }]
        },
        plugins: {
					datalabels: {
						backgroundColor: "rgba(0,0,0,0)",
						color: 'rgba(255, 255, 255, 0.6)',
						font: {
              size: "20"
            },
            align:"end",
            formatter: v => Math.round(v) + "°"
					}
				},
      }
    });
  }

  formatTime(seconds: number) {
    return moment(seconds * 1000).format("LT");
  }

  getWeatherForCurrentLocation() {
    this.clearErrors();

    this.geoLocationService.getLocation().subscribe(
      position => {
        console.log(position);

        this.openWeatherMapApiService.getCurrentWeatherByCoordinates(position.coords.latitude, position.coords.longitude).subscribe(
          weatherData => {
            console.log("current weather data", weatherData);
            this.setCurrentWeatherData(weatherData);

            this.openWeatherMapApiService.getDailyForecastByCoordinates(position.coords.latitude, position.coords.longitude).subscribe(
              dailyDataResponse => {
                console.log("daily data", dailyDataResponse);

                this.setDailyData(dailyDataResponse);
              },
              error => this.getWeatherDataError = true);
          },
          error => this.getWeatherDataError = true);
      },
      error => this.currentLocationError = true);
  }

  setDailyData(dailyDataResponse: IForecastInfo) {
    this.dailyData = new Array();
    
    let groupsByDay: {[key: string]: [IForecastInfo3h]} = new List(dailyDataResponse.list).GroupBy(i => moment(i.dt * 1000).format("YYYYMMDD"), i => i);
    // console.log("groups", groupsByDay);
    for (let key in groupsByDay) {
      
      let displayableDay = new DisplayableDailyWeatherInfo();
      this.dailyData.push(displayableDay);

      let day = groupsByDay[key];
      // console.log(day);

      for (let item of day) {
        // console.log(item);
        displayableDay.chartLabels.push(moment(item.dt * 1000).format("ha"));
        displayableDay.chartValues.push(item.main.temp);
      }

      let dayList = new List<IForecastInfo3h>(groupsByDay[key]);
      let date = moment(key, "YYYYMMDD");

      displayableDay.lowTemp = Math.round(dayList.Select(i => i.main.temp_min).Min());
      displayableDay.highTemp = Math.round(dayList.Select(i => i.main.temp_max).Max());
      displayableDay.dayOfWeek = date.format("ddd");
      displayableDay.dayOfMonth = parseInt(date.format("D"));
      displayableDay.humidity = Math.round(dayList.Select(i => i.main.humidity).Max());
      displayableDay.image = this.getKeyWithMaxElements(dayList.GroupBy(i => i.weather[0].main, i => i));

      // console.log(displayableDay);
    }
    
    this.drawChartAndActivate(this.dailyData[0]);
  }

  getKeyWithMaxElements(dict: {[key: string]: any[]}): string {
    let max = -1;
    let result = "";

    for (let key in dict) {
      let l = dict[key].length;

      if (l > max) {
        max = l;
        result = key;
      }
    }

    return result;
  }

  getWeatherForLocation() {
    this.clearErrors();

    if (!this.location)
      return;

    this.openWeatherMapApiService.getCurrentWeatherByCityName(this.location).subscribe(
      weatherData => {
        console.log(weatherData);
        this.setCurrentWeatherData(weatherData);

        this.openWeatherMapApiService.getDailyForecastByCityName(this.location).subscribe(
          dailyDataResponse => {
            console.log("daily data", dailyDataResponse);

            this.setDailyData(dailyDataResponse);
          },
          error => this.getWeatherDataError = true);
      },
      error => this.getWeatherDataError = true
    );
  }

  switchUnits() {
    if (localStorage.openWeatherMapUnits == "imperial") {
      localStorage.openWeatherMapUnits = "metric";
    } else {
      localStorage.openWeatherMapUnits = "imperial";
    }

    this.getWeatherForLocation();
  }

  onLocationKeyUp(event: KeyboardEvent) {
    if (event.code == "Enter") {
      this.getWeatherForLocation();
    }
  }

  setCurrentWeatherData(weatherData: ICurrentWeatherInfo) {
    this.temperature = Math.round(weatherData.main.temp);
    this.location = weatherData.name;
    console.log(weatherData.weather);
    this.weather = weatherData.weather[0].main;
    // this.weather = "Clear";
    this.wind = weatherData.wind.speed;
    this.windDeg = weatherData.wind.deg;
    this.barometer = weatherData.main.pressure;
    this.visibility = weatherData.visibility / 1000;
    this.humidity = weatherData.main.humidity;
    this.sunrise = this.formatTime(weatherData.sys.sunrise);
    this.sunset = this.formatTime(weatherData.sys.sunset);
  }

  clearErrors() {
    this.currentLocationError = false;
    this.getWeatherDataError = false;
  }

}
