import { ChangeDetectorRef, Component, EventEmitter, inject, Inject, Injectable, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ListaRegistros } from '../shared/models/lista-registros.model';
import { CatalogosService } from '../shared/services/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { RegistroService } from '../shared/services/registro-alta.service';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-dialogo-muestra-detalles',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './dialogo-delete.component.html',
  styleUrl: './dialogo-delete.component.scss'
})
export class DialogoDeleteComponent {
  constructor(public matDialogRef: MatDialogRef<DialogoDeleteComponent>,@Inject (MAT_DIALOG_DATA) public datos: ListaRegistros, private cdr: ChangeDetectorRef, private fb: FormBuilder){

  }

  dataSource = new MatTableDataSource<ListaRegistros>([]);
  #catalogosService = inject(CatalogosService);
  registrosService = inject(RegistroService);


  ContenidoDeLaTabla(): void {
    this.#catalogosService.Lista_Registros({}).subscribe({
      next: (response) => {
        if (response) {
          this.dataSource.data = response;
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
        this.deleteConfirmed.emit()
        this.ContenidoDeLaTabla();
        this.matDialogRef.close();
      },
      error: (error) => {
        console.error('Error deleting registro:', error);
      },
      complete: () => {
        console.log('Delete operation complete!');
      }
    });
  }

  closeDialog(): void {
    this.matDialogRef.close();
  }

  @Output() deleteConfirmed = new EventEmitter<void>();


  
}
