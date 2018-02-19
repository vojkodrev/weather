import { TestBed, inject } from '@angular/core/testing';

import { NavigationBarOptionsService } from './navigation-bar-options.service';

describe('NavigationVisibilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationBarOptionsService]
    });
  });

  it('should be created', inject([NavigationBarOptionsService], (service: NavigationBarOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
