import { Component, OnInit } from '@angular/core';

import { NavigationVisibilityService } from '../../services/navigation-visibility/navigation-visibility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private navigationVisibilityService: NavigationVisibilityService) {

    navigationVisibilityService.visible = true;
  }

  ngOnInit() {
  }

}
