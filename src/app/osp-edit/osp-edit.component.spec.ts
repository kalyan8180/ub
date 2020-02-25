import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OspEditComponent } from './osp-edit.component';

describe('OspEditComponent', () => {
  let component: OspEditComponent;
  let fixture: ComponentFixture<OspEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OspEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OspEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
