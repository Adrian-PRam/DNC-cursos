import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, } from '@angular/material/dialog';



//services
import { CatalogosService } from './shared/services/catalogos.service';
import { CatalogoTipo } from './shared/models/catalogo-tipo.model';
import { CatalogoNecesidad } from './shared/models/catalogo-necesidad.model';
import { RegistroService } from './shared/services/registro-alta.service';
import { ListaRegistros } from './shared/models/lista-registros.model';
import { ParametrosEliminar } from './shared/models/registrados-eliminar.model';
import { DialogoMuestraDetallesComponent } from './dialogo-muestra-detalles/dialogo-muestra-detalles.component';
import { DialogoDeleteComponent } from './dialogo-delete/dialogo-delete.component';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatSort,
    MatSortModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    JsonPipe,
    ReactiveFormsModule,
    MatCheckboxModule,
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



export class AppComponent implements  OnInit {

  //injects
  #catalogosService = inject(CatalogosService);
  registrosService = inject(RegistroService);

  title: string = 'mi-primer-proyecto';
  selectedTipo: string = 'Todos';
  isModalOpen: boolean = false;

  displayedColumns: string[] = ['idDNC', 'nombreDNC', 'TipoRegistro', 'Integrantes', 'fechaHoraDNC', 'duracion', 'costo', 'detalles', 'rechazar'];
  dataSource = new MatTableDataSource<ListaRegistros>([]);

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder) { }



  //
  catalogosRegistro: ListaRegistros[] = [];
  catalogosTipo: CatalogoTipo[] = [];
  catalogosNecesidad: CatalogoNecesidad[] = [];

  idDNC_eliminar: ParametrosEliminar[] = [];


  @ViewChild(MatSort, { static: false }) set ordenamientoTabla(ordenador: MatSort) {if (this.dataSource){ this.dataSource.sort = ordenador; }}
  @ViewChild(MatPaginator, {static: false}) set paginadorTabla(paginador: MatPaginator) {if (this.dataSource){ this.dataSource.paginator = paginador;}}


  applyFilter(event: MatSelectChange): void {
    const filterValue = event.value || 'todos'; 
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  
  
/*
  filteredData = this.dataSource;
  filterTable(){
    if (!this.selectedTipo){
      this.filteredData = this.dataSource;
    } else{
      this.filteredData = this.dataSource.filter(item =>
        item.TipoRegistro === this.selectedTipo
      )
    }
  }
  */

  nombre: string = '';
  justificacion: string = '';
  tipo: number | null = null;
  integrante: number | null = null;
  fecha: Date | null = null;
  duracion: number | null = null;
  costo: number | null = null;

  readonly dialog = inject(MatDialog);

  openDialog(registro: ListaRegistros) {
    this.dialog.open(DialogoMuestraDetallesComponent, { data: registro });
  }

  openDialogDelete(registro: ListaRegistros) {
    const dialogRef = this.dialog.open(DialogoDeleteComponent, { data: registro });
    dialogRef.componentInstance.deleteConfirmed.subscribe(() => {
      this.ContenidoDeLaTabla();
    });
  }




  form!: FormGroup;
  selectedNecesidades: CatalogoNecesidad[] = [];
  necesidades: any[] = [];

  onCheckboxChange(event: MatCheckboxChange, necesidad: any): void {
    if (event.checked) {
      this.selectedNecesidades.push(necesidad);
    } else {
      const index = this.selectedNecesidades.indexOf(necesidad);
      if (index >= 0) {
        this.selectedNecesidades.splice(index, 1);
      }
    }
    console.log('Selected Necesidades:', this.selectedNecesidades);
  }


  ngOnInit(): void {
    this.obtenerCatalogo();
    this.ContenidoDeLaTabla();
    /*
    this.dataSource.sortingDataAccessor = (data: any, col)=>{
      if(col=='id'){
        return data.idDNC;
      }
      else{
        return data[col];
      }
    }
      */
    this.dataSource.filterPredicate = (data: ListaRegistros, filter: string): boolean => {
      const filterValue = filter.trim().toLowerCase();
      const tipoRegistro = (data.TipoRegistro || '').trim().toLowerCase();
      return filterValue === 'todos' || tipoRegistro === filterValue;
    };
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
    if (this.duracion && this.nombre && this.justificacion && this.tipo && this.integrante && this.fecha && this.costo) {
      const newEntry = {
        idTipoRegistro: this.tipo,
        justificacion: this.justificacion,
        nombreDNC: this.nombre,
        Integrantes: this.integrante,
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
        idsNecesidades: this.selectedNecesidades.map((necesidad) => necesidad.idNecesidad).join('|')
      };

      this.registrosService.registradosAlta(newEntry).subscribe({
        next: (respuesta) => {
          console.log(respuesta);
          if (+respuesta[0].error === 0) {
            //Falta recargar la tabla con la API

            this.ContenidoDeLaTabla();
            this.selectedNecesidades = [];
            this.nombre = '';
            this.justificacion = '';
            this.tipo = null;
            this.integrante = null;
            this.fecha = null;
            this.duracion = null;
            this.costo = null;
            this.closeModal();
            this.isModalOpen = false;
            console.log("condicion cumplida!");
            this.cdr.detectChanges();
            console.log('Selected Necesidades:', this.selectedNecesidades);

          }

          else {
            alert(respuesta[0].mensaje);
            console.log("else activado")
          }
        }
      });

      /*
      const currentData = this.dataSource.data;
      this.dataSource.data = [...currentData, newEntry];
      */



    }
  }



  /**
   * Obtiene el catalogo de tipo....
   * @return Respuesta de la API
   */
  public obtenerCatalogo(): void {
    this.#catalogosService.Catalogos_TipoDNC().subscribe({
      next: (response) => {
        if (response) {
          this.catalogosTipo = response;
          console.log("tipos", response)
        }
      },
      error: (error) => {
        console.error('Error fetching Catalogos_TipoDNC:', error);
      }
    });

    this.#catalogosService.Catalogos_Necesidades({}).subscribe({
      next: (response) => {
        if (response) {
          this.catalogosNecesidad = response;
          console.log("Necesidades");
          console.log(response);
        }
      },
      error: (error) => {
        console.error('Error fetching Catalogos_Necesidades:', error);
      }
    });









  }

  ContenidoDeLaTabla(): void {
    this.#catalogosService.Lista_Registros({}).subscribe({
      next: (response) => {
        if (response) {
          this.dataSource.data = response;
          console.log("lista registros", response);
          this.dataSource.filter = this.selectedTipo.trim().toLowerCase();
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error fetching Lista_Registros:', error);
      }
    });
  }






  deleteRegistro(idDNC: number) {
    this.registrosService.registradosEliminar(idDNC).subscribe({
      next: (response) => {
        console.log('Registro deleted successfully:', response);
        alert(response[0].mensaje);
        this.ContenidoDeLaTabla();
      },
      error: (error) => {
        console.error('Error deleting registro:', error);
      },
      complete: () => {
        console.log('Delete operation complete!');
      }
    });
  }

  
  

  

  



}

