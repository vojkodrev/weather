import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWeatherListItemComponent } from './dashboard-weather-list-item.component';

describe('DashboardWeatherListItemComponent', () => {
  let component: DashboardWeatherListItemComponent;
  let fixture: ComponentFixture<DashboardWeatherListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWeatherListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWeatherListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
