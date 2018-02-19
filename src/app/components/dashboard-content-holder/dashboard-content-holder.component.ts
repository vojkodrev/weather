import { Component, OnInit, Input } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-content-holder',
  templateUrl: './dashboard-content-holder.component.html',
  styleUrls: ['./dashboard-content-holder.component.scss']
})
export class DashboardContentHolderComponent implements OnInit {

  @Input() contentStyle: SafeStyle;

  constructor() { }

  ngOnInit() {
  }

}
