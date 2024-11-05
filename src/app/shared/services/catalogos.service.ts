import { Injectable } from '@angular/core';
import { ServicioBaseService } from './servicio-base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService  extends ServicioBaseService{

   /**
   * Obtiene el catalogo de tipos DNC
   * @returns Un arreglo con los catálogos.
   * @params extras - parámetros a enviar a la petición.
   * 
   */
   public Catalogos_TipoDNC(extras: Object): Observable<any[]> {
    const params = {
      servicio: 'consulta',
      accion: 'Catalogos_TipoDNC',
    };

    return this.consulta({...params, extras});
  }


  //aqui
}
