import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

//services
import { CatalogosService } from './shared/services/catalogos.service';
import { CatalogoTipo } from './shared/models/catalogo-tipo.model';
import { CatalogoNecesidad } from './shared/models/catalogo-necesidad.model';

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
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginator, 
    MatPaginatorModule,
    MatFormFieldModule,
    CurrencyPipe, 
    DatePipe,
    MatDatepickerModule,
    MatDividerModule,
    MatButtonModule,
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

  displayedColumns: string[] = ['nombre', 'justificacion', 'tipo', 'integrantes', 'fecha','duracion', 'costo', 'rechazar'];
  dataSource = new MatTableDataSource<any>([]);


  //
  catalogosTipo: CatalogoTipo[] = [];
  catalogosNecesidad: CatalogoNecesidad[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombre: string = '';
  justificacion: string = '';
  tipo: string = '';
  integrante: string = '';
  fecha: Date | null = null;
  duracion: string = '';
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
    if (this.duracion && this.nombre && this.justificacion && this.tipo && this.integrantesList.length > 0 && this.fecha && this.costo) {
      const newEntry = {
        nombre: this.nombre,
        justificacion: this.justificacion,
        tipo: this.tipo,
        integrantes: [...this.integrantesList], 
        showIntegrantes: false, 
        fecha: this.fecha,
        duracion: this.duracion,
        costo: this.costo,
      };


      const currentData = this.dataSource.data;
      this.dataSource.data = [...currentData, newEntry];

      this.nombre = '';
      this.justificacion = '';
      this.tipo = '';
      this.integrantesList = [];
      this.fecha = null;
      this.duracion = '';
      this.costo = '';
      this.closeModal();
    }
  }

  toggleIntegrantes(entry: any): void {
    entry.showIntegrantes = !entry.showIntegrantes; 
  }

  /**
   * Obtiene el catalogo de tipo....
   * @return Respuesta de la API
   */
  public obtenerCatalogo(): void {
    this.#catalogosService.Catalogos_TipoDNC({}).subscribe({
      next: (response) => {
        if (response) {
          this.catalogosTipo = response;
        }
      },
      error: (error) => {
        console.error('Error fetching Catalogos_TipoDNC:', error);
      }
    });

    this.#catalogosService.Catalogos_NecesidadDNC({}).subscribe({
      next: (response) => {
        if (response) {
          this.catalogosNecesidad = response;
        }
      },
      error: (error) => {
        console.error('Error fetching Catalogos_NecesidadDNC:', error);
      }
    });
}
  }

    




 
