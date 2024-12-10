import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoMuestraDetallesComponent } from './dialogo-muestra-detalles.component';

describe('DialogoMuestraDetallesComponent', () => {
  let component: DialogoMuestraDetallesComponent;
  let fixture: ComponentFixture<DialogoMuestraDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoMuestraDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoMuestraDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
