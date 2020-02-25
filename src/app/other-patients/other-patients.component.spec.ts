import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPatientsComponent } from './other-patients.component';

describe('OtherPatientsComponent', () => {
  let component: OtherPatientsComponent;
  let fixture: ComponentFixture<OtherPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
