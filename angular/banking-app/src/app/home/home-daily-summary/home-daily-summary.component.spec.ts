import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDailySummaryComponent } from './home-daily-summary.component';

describe('HomeDailySummaryComponent', () => {
  let component: HomeDailySummaryComponent;
  let fixture: ComponentFixture<HomeDailySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDailySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDailySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
