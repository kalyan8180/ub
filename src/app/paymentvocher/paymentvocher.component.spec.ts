import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentvocherComponent } from './paymentvocher.component';

describe('PaymentvocherComponent', () => {
  let component: PaymentvocherComponent;
  let fixture: ComponentFixture<PaymentvocherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentvocherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentvocherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
