import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBolsaTrabajoComponent } from './registro-bolsa-trabajo.component';

describe('RegistroBolsaTrabajoComponent', () => {
  let component: RegistroBolsaTrabajoComponent;
  let fixture: ComponentFixture<RegistroBolsaTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroBolsaTrabajoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroBolsaTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
