import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuebillsComponent } from './duebills.component';

describe('DuebillsComponent', () => {
  let component: DuebillsComponent;
  let fixture: ComponentFixture<DuebillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuebillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuebillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
