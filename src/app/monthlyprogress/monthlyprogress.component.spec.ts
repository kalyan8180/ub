import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyprogressComponent } from './monthlyprogress.component';

describe('MonthlyprogressComponent', () => {
  let component: MonthlyprogressComponent;
  let fixture: ComponentFixture<MonthlyprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
