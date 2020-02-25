import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemledgerreportComponent } from './itemledgerreport.component';

describe('ItemledgerreportComponent', () => {
  let component: ItemledgerreportComponent;
  let fixture: ComponentFixture<ItemledgerreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemledgerreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemledgerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
