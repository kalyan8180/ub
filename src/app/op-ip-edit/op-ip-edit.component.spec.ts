import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpIpEditComponent } from './op-ip-edit.component';

describe('OpIpEditComponent', () => {
  let component: OpIpEditComponent;
  let fixture: ComponentFixture<OpIpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpIpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpIpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
