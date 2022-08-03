import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosseguridadComponent } from './registrosseguridad.component';

describe('RegistrosseguridadComponent', () => {
  let component: RegistrosseguridadComponent;
  let fixture: ComponentFixture<RegistrosseguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrosseguridadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosseguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
