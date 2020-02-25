import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistVendorsComponent } from './exist-vendors.component';

describe('ExistVendorsComponent', () => {
  let component: ExistVendorsComponent;
  let fixture: ComponentFixture<ExistVendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExistVendorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
