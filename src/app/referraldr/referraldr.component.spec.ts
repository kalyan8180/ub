import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferraldrComponent } from './referraldr.component';

describe('ReferraldrComponent', () => {
  let component: ReferraldrComponent;
  let fixture: ComponentFixture<ReferraldrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferraldrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferraldrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
