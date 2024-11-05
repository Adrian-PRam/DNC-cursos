import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CursosRegistradosComponent } from './cursos-registrados/cursos-registrados.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

//services
import { CatalogosService } from './shared/services/catalogos.service';
import { CatalogoTipo } from './shared/models/catalogo-tipo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    RouterOutlet,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    CommonModule,
    CursosRegistradosComponent,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginator, 
    MatPaginatorModule,
    MatFormFieldModule,
    CurrencyPipe, 
    DatePipe,
    MatDatepickerModule,

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class AppComponent implements AfterViewInit{

  //injects
  #catalogosService = inject(CatalogosService);

  title: string = 'mi-primer-proyecto';
  selectedEstatus: string = 'todos';
  selectedTipo: string = 'Todos';
  isModalOpen: boolean = false;

  displayedColumns: string[] = ['nombre', 'tipo', 'integrantes', 'fecha', 'costo', 'rechazar'];
  dataSource = new MatTableDataSource<any>([]);


  //
  catalogosTipo: CatalogoTipo[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombre: string = '';
  tipo: string = '';
  integrante: string = '';
  fecha: Date | null = null;
  costo: string = '';

  integrantesList: string[] = [];

  agregarIntegrante() {
    if (this.integrante) {
      this.integrantesList.push(this.integrante);
      this.integrante = '';
    }
  }



  quitarIntegrante() {
    this.integrantesList.pop();
  }

  ngOnInit():void {
    this.obtenerCatalogo();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  removeEntry(entry: any): void {
    const currentData = this.dataSource.data;
    this.dataSource.data = currentData.filter(e => e !== entry);
  }

  onSubmit(dataForm: any): void {
    if (this.nombre && this.tipo && this.integrantesList.length > 0 && this.fecha && this.costo) {
      const newEntry = {
        nombre: this.nombre,
        tipo: this.tipo,
        integrantes: this.integrantesList.length,
        fecha: this.fecha,
        costo: this.costo,
      };


      const currentData = this.dataSource.data;
      this.dataSource.data = [...currentData, newEntry];

      this.nombre = '';
      this.tipo = '';
      this.integrantesList = [];
      this.fecha = null;
      this.costo = '';
      this.closeModal();
    }
  }

  /**
   * Obtiene el catalogo de tipo....
   * @return Respuesta de la API
   */
  public obtenerCatalogo(): void {

    const fetchCatalogos = this.#catalogosService.Catalogos_TipoDNC({}).subscribe({
      next: (response => {
        if (response) {
          this.catalogosTipo = response;
        }
      }),
      error: (error)=> {
        console.error(error);
      }
    })
  }

 
}