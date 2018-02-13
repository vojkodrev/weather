import { Component } from '@angular/core';

import { NavigationVisibilityService } from '../../services/navigation-visibility/navigation-visibility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private navigationVisibilityService: NavigationVisibilityService) {
  }
}
