import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona';
import { ResponseApi } from '../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  apiBase: string = 'https://localhost:7220/api/Personas/';

  constructor(private http: HttpClient) { }


  getPersonas(): Observable<Persona[]> {
    console.log(" Url Lista Personas --> " + `${this.apiBase}Lista`);
    return this.http.get<Persona[]>(`${this.apiBase}Lista`);
  }

  /*save(request: Producto): Observable<ResponseApi> {

    return this.http.post<ResponseApi>(`${this.apiBase}Guardar`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })

  }

  edit(request: Producto): Observable<ResponseApi> {

    return this.http.put<ResponseApi>(`${this.apiBase}Editar`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })

  }

  delete(id: number): Observable<ResponseApi> {

    return this.http.delete<ResponseApi>(`${this.apiBase}Eliminar/${id}`);

  }*/
}
