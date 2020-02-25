import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthchekupComponent } from './healthchekup.component';

describe('HealthchekupComponent', () => {
  let component: HealthchekupComponent;
  let fixture: ComponentFixture<HealthchekupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthchekupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthchekupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
