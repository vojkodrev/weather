import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContentHolderComponent } from './dashboard-content-holder.component';

describe('DashboardContentHolderComponent', () => {
  let component: DashboardContentHolderComponent;
  let fixture: ComponentFixture<DashboardContentHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardContentHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardContentHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
