import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-weather-list-item',
  templateUrl: './dashboard-weather-list-item.component.html',
  styleUrls: ['./dashboard-weather-list-item.component.scss']
})
export class DashboardWeatherListItemComponent implements OnInit {

  @Input() active: boolean;
  @Input() image: string;
  @Input() day: string;
  @Input() dayOfMonth: string;
  @Input() percipitation: number;
  @Input() high: number;
  @Input() low: number;

  images = {
    "cloudy": "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBaGxJ.img?m=6&o=true&u=true&n=true&w=30&h=30",
    "sunny": "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBb3WX.img?m=6&o=true&u=true&n=true&w=30&h=30",
    "raining": "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBayJl.img?m=6&o=true&u=true&n=true&w=30&h=30",
    "snowing": "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBb49j.img?m=6&o=true&u=true&n=true&w=30&h=30",
  };

  constructor() { }

  ngOnInit() {
  }

}
