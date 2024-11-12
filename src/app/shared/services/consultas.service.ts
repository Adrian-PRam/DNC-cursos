import { Injectable } from '@angular/core';
import { ServicioBaseService } from './servicio-base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService extends ServicioBaseService {

  /**
   * Método para consultar la lista de registros
   * @returns Observable con los datos de la lista de registros
   */
  lista_Registros(): Observable<any> {
    return this.consulta('Lista_Registros');
  }

  /**
   * Método para buscar empleados
   * @param indicador Parámetro de búsqueda
   * @returns Observable con los resultados de la búsqueda de empleados
   */
  buscadorEmpleados(indicador: string): Observable<any> {
    
    const params = {
      accion: 'buscadorEmpleados',
      indicador: indicador
    };

    return this.consulta(params); 
  }
}
