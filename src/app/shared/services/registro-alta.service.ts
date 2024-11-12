import { Injectable } from '@angular/core';
import { ServicioBaseService } from './servicio-base.service';
import { Observable } from 'rxjs';

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
  registradosAlta(idTipoRegistro: number, justificacion: string, nombreDNC: string, fechaHoraDNC: Date, costo: number, duracion: string): Observable<any> {
    const params = {
      accion: 'Registrados_Alta',
      idTipoRegistro: idTipoRegistro.toString(),
      justificacion: justificacion,
      nombreDNC: nombreDNC,
      fechaHoraDNC: fechaHoraDNC.toISOString(),
      costo: costo.toString(),
      duracion: duracion
    };
    return this.consulta(params, 'alta');
  }

  /**
   * Servicio para editar un registro existente
   * @param idDNC
   * @param idTipoRegistro
   * @param justificacion
   * @param nombreDNC
   * @param fechaHoraDNC
   * @param costo
   * @param duracion
   * @returns Observable con la respuesta de la edición
   */
  registradosEditar(idDNC: number, idTipoRegistro: number, justificacion: string, nombreDNC: string, fechaHoraDNC: Date, costo: number, duracion: string): Observable<any> {
    const params = {
      accion: 'Registrados_Editar',
      idDNC: idDNC.toString(),
      idTipoRegistro: idTipoRegistro.toString(),
      justificacion: justificacion,
      nombreDNC: nombreDNC,
      fechaHoraDNC: fechaHoraDNC.toISOString(),
      costo: costo.toString(),
      duracion: duracion
    };
    return this.consulta(params, 'alta');
  }

  /**
   * Servicio para eliminar un registro
   * @param idDNC
   * @returns Observable con la respuesta de la eliminación
   */
  registradosEliminar(idDNC: number): Observable<any> {
    const params = {
      accion: 'Registrados_Eliminar',
      idDNC: idDNC.toString()
    };
    return this.consulta(params, 'alta');
  }
}
