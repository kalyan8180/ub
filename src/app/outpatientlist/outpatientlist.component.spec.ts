import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientlistComponent } from './outpatientlist.component';

describe('OutpatientlistComponent', () => {
  let component: OutpatientlistComponent;
  let fixture: ComponentFixture<OutpatientlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpatientlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpatientlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
