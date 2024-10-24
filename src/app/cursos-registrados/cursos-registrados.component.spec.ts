import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosRegistradosComponent } from './cursos-registrados.component';

describe('CursosRegistradosComponent', () => {
  let component: CursosRegistradosComponent;
  let fixture: ComponentFixture<CursosRegistradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosRegistradosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
