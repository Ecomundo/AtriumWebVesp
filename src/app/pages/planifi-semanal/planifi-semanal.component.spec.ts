import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifiSemanalComponent } from './planifi-semanal.component';

describe('PlanifiSemanalComponent', () => {
  let component: PlanifiSemanalComponent;
  let fixture: ComponentFixture<PlanifiSemanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanifiSemanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanifiSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
