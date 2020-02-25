import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferraldrlistComponent } from './referraldrlist.component';

describe('ReferraldrlistComponent', () => {
  let component: ReferraldrlistComponent;
  let fixture: ComponentFixture<ReferraldrlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferraldrlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferraldrlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
