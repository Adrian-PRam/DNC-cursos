import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy, inject, OnInit,  ChangeDetectorRef } from '@angular/core';
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
import { RegistroService } from './shared/services/registro-alta.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
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



export class AppComponent implements AfterViewInit, OnInit{

  //injects
  #catalogosService = inject(CatalogosService);
  registrosService = inject(RegistroService);

  title: string = 'mi-primer-proyecto';
  selectedEstatus: string = 'todos';
  selectedTipo: string = 'Todos';
  isModalOpen: boolean = false;

  displayedColumns: string[] = ['nombre', 'justificacion', 'tipo', 'integrantes', 'fecha','duracion', 'costo', 'rechazar'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private cdr: ChangeDetectorRef) {}


  //
  catalogosTipo: CatalogoTipo[] = [];
  catalogosNecesidad: CatalogoNecesidad[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombre: string = '';
  justificacion: string = '';
  tipo: number | null = null;
  integrante: string = '';
  fecha: Date | null = null;
  duracion: number | null = null;
  costo: number | null = null;

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
        idTipoRegistro: this.tipo,
        justificacion: this.justificacion,
        nombreDNC: this.nombre,

        integrantes: [...this.integrantesList].length, 
        showIntegrantes: false, 
        fechaHoraDNC: new Intl.DateTimeFormat(
          'sv-SE',
          {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
            timeZone: 'America/Monterrey',
          })
            .format(this.fecha)
            .replace(' ', 'T'),
        duracion: this.duracion,
        costo: this.costo,
      };

      this.registrosService.registradosAlta(newEntry).subscribe({next:(respuesta)=>{
        
        if (+respuesta[0].error===0){
          //Falta recargar la tabla con la API
          
          this.nombre = '';
          this.justificacion = '';
          this.tipo = null;
          this.integrantesList = [];
          this.fecha = null;
          this.duracion = null;
          this.costo = null;
          this.closeModal();
          this.isModalOpen = false;
          console.log("condicion cumplida!")
          this.cdr.detectChanges();
          
        }

        else{
          alert(respuesta[0].mensaje);
          console.log("else activado")
        }
      }});

      /*
      const currentData = this.dataSource.data;
      this.dataSource.data = [...currentData, newEntry];
      */


      
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

    




 
