import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFieldComponent } from './dashboard-field.component';

describe('DashboardFieldComponent', () => {
  let component: DashboardFieldComponent;
  let fixture: ComponentFixture<DashboardFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
