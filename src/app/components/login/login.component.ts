import { Component, OnInit } from '@angular/core';

import { NavigationVisibilityService } from '../../services/navigation-visibility/navigation-visibility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private navigationVisibilityService: NavigationVisibilityService) {

    navigationVisibilityService.visible = false;
  }

  ngOnInit() {
  }

}
