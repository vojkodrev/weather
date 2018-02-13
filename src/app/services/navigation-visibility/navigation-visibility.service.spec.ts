import { TestBed, inject } from '@angular/core/testing';

import { NavigationVisibilityService } from './navigation-visibility.service';

describe('NavigationVisibilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationVisibilityService]
    });
  });

  it('should be created', inject([NavigationVisibilityService], (service: NavigationVisibilityService) => {
    expect(service).toBeTruthy();
  }));
});
