import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroGuardiasComponent } from './registro-guardias.component';

describe('RegistroGuardiasComponent', () => {
  let component: RegistroGuardiasComponent;
  let fixture: ComponentFixture<RegistroGuardiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroGuardiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroGuardiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
