import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindoctorviewComponent } from './admindoctorview.component';

describe('AdmindoctorviewComponent', () => {
  let component: AdmindoctorviewComponent;
  let fixture: ComponentFixture<AdmindoctorviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindoctorviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindoctorviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
