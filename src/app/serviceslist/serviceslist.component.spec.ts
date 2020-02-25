import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceslistComponent } from './serviceslist.component';

describe('ServiceslistComponent', () => {
  let component: ServiceslistComponent;
  let fixture: ComponentFixture<ServiceslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
