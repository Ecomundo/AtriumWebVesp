import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeccionarioComponent } from './leccionario.component';

describe('LeccionarioComponent', () => {
  let component: LeccionarioComponent;
  let fixture: ComponentFixture<LeccionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeccionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeccionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
