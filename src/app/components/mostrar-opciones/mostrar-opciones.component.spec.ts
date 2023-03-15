import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarOpcionesComponent } from './mostrar-opciones.component';

describe('MostrarOpcionesComponent', () => {
  let component: MostrarOpcionesComponent;
  let fixture: ComponentFixture<MostrarOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarOpcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
