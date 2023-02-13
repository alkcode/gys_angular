import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGuardiasComponent } from './gestion-guardias.component';

describe('GestionGuardiasComponent', () => {
  let component: GestionGuardiasComponent;
  let fixture: ComponentFixture<GestionGuardiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionGuardiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionGuardiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
