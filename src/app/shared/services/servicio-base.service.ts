import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment";


export class ServicioBaseService {

  //injects
  #http = inject(HttpClient);

  constructor() { }

  public consulta(params: any, apiURL = environment.api): Observable<any>{
    const formData = new FormData();

    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    })

    return this.#http.post<any>(environment.server + apiURL, formData).pipe(
      map((response)=> {
        return response.info ? response.info : response;
      })
    )
  }
}
