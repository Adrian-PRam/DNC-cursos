import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ListaRegistros } from '../shared/models/lista-registros.model';


@Component({
  selector: 'app-dialogo-muestra-detalles',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './dialogo-muestra-detalles.component.html',
  styleUrl: './dialogo-muestra-detalles.component.scss'
})
export class DialogoMuestraDetallesComponent {
  constructor(public matDialogRef: MatDialogRef<DialogoMuestraDetallesComponent>,@Inject (MAT_DIALOG_DATA) public datos: ListaRegistros){

  }
}
