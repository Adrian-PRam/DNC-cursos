import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatSelectModule} from '@angular/material/select'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
            FormsModule, 
            MatIconModule,
            MatMenuModule,
            MatSelectModule,
            CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'mi-primer-proyecto';
  selectedEstatus: string = 'todos';
  selectedTipo: string = 'Todos';

  isModalOpen: boolean = false;
  modalTitle: string = 'AGREGAR CURSOS';

  nombre: string = '';
  tipo: string = '';
  integrante: string = '';  
  fecha: Date | null = null;
  costo: string = '';

 
  integrantesList: string[] = []; 

  entries: { nombre: string; tipo: string; integrantes: number; fecha: Date; costo: string }[] = [];

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  removeEntry(entry: any): void {
    const index = this.entries.indexOf(entry);
    if (index !== -1) {
      this.entries.splice(index, 1);
    }
  }

  
  agregarIntegrante() {
    if (this.integrante) {
      this.integrantesList.push(this.integrante);  
      this.integrante = ''; 
    }
  }

 
  quitarIntegrante() {
    this.integrantesList.pop();  
  }

  onSubmit(dataForm: any): void {
    if (this.nombre && this.tipo && this.integrantesList.length > 0 && this.fecha && this.costo) {
      this.entries.push({
        nombre: this.nombre,
        tipo: this.tipo,
        integrantes: this.integrantesList.length,  
        fecha: this.fecha,
        costo: this.costo
      });


      this.nombre = '';
      this.tipo = '';
      this.integrantesList = [];  
      this.fecha = null;
      this.costo = '';

      this.closeModal();
    }
  }
}

