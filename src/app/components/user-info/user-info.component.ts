import { Component, OnInit } from '@angular/core';

import { NavigationVisibilityService } from '../../services/navigation-visibility/navigation-visibility.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private navigationVisibilityService: NavigationVisibilityService) {

    navigationVisibilityService.visible = true;
  }

  ngOnInit() {
  }

}
