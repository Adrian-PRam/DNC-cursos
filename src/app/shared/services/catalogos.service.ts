import { Injectable } from '@angular/core';
import { ServicioBaseService } from './servicio-base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService extends ServicioBaseService {

   /**
   * Obtiene el catalogo de tipos DNC
   * @returns Un arreglo con los catálogos.
   * @params extras - parámetros a enviar a la petición.
   */
   public Catalogos_TipoDNC(extras: Object): Observable<any[]> {
      const params = {
         servicio: 'consulta',
         accion: 'Catalogos_TipoDNC',
      };

      return this.consulta({ ...params, extras });
   }

   /**
   * Obtiene el catalogo de necesidades DNC
   * @returns Un arreglo con los catálogos.
   * @params extras - parámetros a enviar a la petición.
   */
   public Catalogos_NecesidadDNC(extras: Object): Observable<any[]> {
      const params = {
         servicio: 'consulta',
         accion: 'Catalogos_Necesidades',
      };

      return this.consulta({ ...params, extras });
   }

   /**
   * Obtiene el catálogo de integrantes DNC
   * @param idDNC - El ID del DNC que se desea consultar.
   * @returns Un arreglo con los integrantes del DNC.
   */
   public Catalogos_IntegrantesDNC(idDNC: string): Observable<any[]> {
      const params = {
         servicio: 'consulta',
         accion: 'Catalogos_Integrantes',
         idDNC: idDNC
      };

      return this.consulta(params);
   }

   /**
   * Obtiene el catálogo de integrantes DNC
   * @param idDNC - El ID del DNC que se desea consultar.
   * @returns Un arreglo con los integrantes del DNC.
   */
   public Catalogos_NecesidadxRegistro(idDNC: string): Observable<any[]> {
    const params = {
       servicio: 'consulta',
       accion: 'Catalogos_NecesidadesxRegistro',
       idDNC: idDNC
    };

    return this.consulta(params);
 }

 /**
   * Obtiene el catálogo de integrantes DNC
   * @param idDNC - El ID del DNC que se desea consultar.
   * @returns Un arreglo con los integrantes del DNC.
   */
 public Catalogos_Integrantes(idDNC: string): Observable<any[]> {
  const params = {
     servicio: 'consulta',
     accion: 'Catalogos_Integrantes',
     idDNC: idDNC
  };

  return this.consulta(params);
}
}
