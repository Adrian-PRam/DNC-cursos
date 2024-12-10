import { Injectable } from '@angular/core';
import { ServicioBaseService } from './servicio-base.service';
import { map, Observable } from 'rxjs';
import { ListaRegistros } from '../models/lista-registros.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService extends ServicioBaseService {

   /**
   * Obtiene el catalogo de tipos DNC
   * @returns Un arreglo con los catálogos.
   * @params extras - parámetros a enviar a la petición.
   */
   public Catalogos_TipoDNC(): Observable<any[]> {
      const params = {
         servicio: 'consulta',
         accion: 'Catalogos_TipoDNC',
         tipoRespuesta: 'json',
      };

      return this.consulta( params );
   }

   /**
   * Obtiene el catalogo de necesidades DNC
   * @returns Un arreglo con los catálogos.
   * @params extras - parámetros a enviar a la petición.
   */
   public Catalogos_Necesidades(extras: Object): Observable<any[]> {
      const params = {
         servicio: 'consulta',
         accion: 'Catalogos_Necesidades',
         tipoRespuesta: 'json',
      };

      return this.consulta({ ...params, ...extras });
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

/**
   * Obtiene el catalogo de tipos DNC
   * @returns Un arreglo con los catálogos.
   * @params extras - parámetros a enviar a la petición.
   */
public Lista_Registros(extras: Object): Observable<any[]> {
   const params = {
      servicio: 'consulta',
      accion: 'Lista_Registros',
      tipoRespuesta: 'json',
   };

   return this.consulta({ ...params, ...extras }).pipe(map((registros)=>{return registros.map((registro: ListaRegistros)=>{registro.idDNC = +registro.idDNC; registro.fechaHoraDNC= registro.fechaHoraDNC.replace(' ','T'); return registro;});}));
}
}
