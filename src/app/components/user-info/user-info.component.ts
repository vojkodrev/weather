import { Component, OnInit } from '@angular/core';

import { NavigationBarOptionsService } from '../../services/navigation-bar-options/navigation-bar-options.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private navigationBarOptionsService: NavigationBarOptionsService) {

    navigationBarOptionsService.visible = true;
    navigationBarOptionsService.selected = "userInfo";
  }

  ngOnInit() {
  }

}
