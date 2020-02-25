import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OspbillingComponent } from './ospbilling.component';

describe('OspbillingComponent', () => {
  let component: OspbillingComponent;
  let fixture: ComponentFixture<OspbillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OspbillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OspbillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
