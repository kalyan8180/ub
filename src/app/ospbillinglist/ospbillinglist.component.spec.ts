import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OspbillinglistComponent } from './ospbillinglist.component';

describe('OspbillinglistComponent', () => {
  let component: OspbillinglistComponent;
  let fixture: ComponentFixture<OspbillinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OspbillinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OspbillinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
