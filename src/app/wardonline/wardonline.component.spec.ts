import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardonlineComponent } from './wardonline.component';

describe('WardonlineComponent', () => {
  let component: WardonlineComponent;
  let fixture: ComponentFixture<WardonlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardonlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
