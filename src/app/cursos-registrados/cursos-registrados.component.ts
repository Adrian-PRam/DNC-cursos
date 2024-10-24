import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CursoRegistrado } from '../shared/models/curso-registrado.model';

@Component({
  selector: 'app-cursos-registrados',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './cursos-registrados.component.html',
  styleUrl: './cursos-registrados.component.scss',
})
export class CursosRegistradosComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cursosRegistrados: MatTableDataSource<CursoRegistrado>;

  columnasTabla: string[];

  readonly CURSOS_REGISTRADOS: CursoRegistrado[] = [
    {
      id: 1,
      nombreCurso: 'Curso de html',
      tipo: 'Curso',
      integrantes: 15,
      fecha: '2024-08-23T00:00:00',
      costo: 40000,
    },
    {
      id: 2,
      nombreCurso: 'Curso de css',
      tipo: 'Curso',
      integrantes: 10,
      fecha: '2024-08-23T00:00:00',
      costo: 20000,
    },
    {
      id: 3,
      nombreCurso: 'Curso de Angular',
      tipo: 'Curso',
      integrantes: 15,
      fecha: '2024-08-23T00:00:00',
      costo: 40000,
    },
  ];

  constructor() {
    this.columnasTabla = [
      'nombreCurso',
      'tipo',
      'integrantes',
      'fecha',
      'costo',
      'acciones',
    ];

    this.cursosRegistrados = new MatTableDataSource();
    this.cursosRegistrados.data = this.CURSOS_REGISTRADOS;
  }

  ngAfterViewInit() {
    this.cursosRegistrados.paginator = this.paginator;
  }

  rechazaCurso(cursoARechazar: CursoRegistrado): void {
    // Agrega un elemento al modelo de la tabla.
    const cursosRegistradosActualmente = this.cursosRegistrados.data;
    cursosRegistradosActualmente.push({
      id: 4,
      nombreCurso: 'Curso de TypeScript',
      tipo: 'Curso',
      integrantes: 15,
      fecha: '2024-08-23T00:00:00',
      costo: 40000,
    });
    this.cursosRegistrados.data = cursosRegistradosActualmente;

    // Elimina un elemento del modelo de la tabla.
    this.cursosRegistrados.data = this.cursosRegistrados.data.filter(
      (curso) => curso.id !== cursoARechazar.id
    );
  }
}
