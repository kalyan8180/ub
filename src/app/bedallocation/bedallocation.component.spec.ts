import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedallocationComponent } from './bedallocation.component';

describe('BedallocationComponent', () => {
  let component: BedallocationComponent;
  let fixture: ComponentFixture<BedallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
