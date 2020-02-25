import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabAdminComponent } from './lab-admin.component';

describe('LabAdminComponent', () => {
  let component: LabAdminComponent;
  let fixture: ComponentFixture<LabAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
