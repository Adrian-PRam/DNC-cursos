import { Injectable } from '@angular/core';
import { ServicioBaseService } from './servicio-base.service';
import { Observable } from 'rxjs';
import { ParametrosEditar } from '../models/registrados-editar.model';
import { ParametrosAlta } from '../models/registrados-alta.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroService extends ServicioBaseService {

  /**
   * Servicio para dar de alta un registro
   * @param idTipoRegistro
   * @param justificacion
   * @param nombreDNC
   * @param fechaHoraDNC
   * @param costo
   * @param duracion
   * @returns Observable con la respuesta del alta
   */
  registradosAlta(extras: ParametrosAlta): Observable<any> {
    const params = {
      accion: 'Registrados_Alta',
      servicio: 'alta',
      tipoRespuesta: 'json',
    };
    return this.consulta({...params, ...extras});
  }

  /**
   * Servicio para editar un registro existente
   * @returns Observable con la respuesta de la edición
   */
  registradosEditar(extras: ParametrosEditar): Observable<any> {
    const params = {
      accion: 'Registrados_Editar',
      servicio: 'alta',
      tipoRespuesta: 'json',
    };
    return this.consulta({...params, ...extras});
  }

  /**
   * Servicio para eliminar un registro
   * @param idDNC
   * @returns Observable con la respuesta de la eliminación
   */
  registradosEliminar(idDNC: number): Observable<any> {
    const params = {
      servicio: 'alta',
      accion: 'Registrados_Eliminar',
      tipoRespuesta: 'json',
      idDNC: idDNC
    };
    return this.consulta(params);
  }
}
