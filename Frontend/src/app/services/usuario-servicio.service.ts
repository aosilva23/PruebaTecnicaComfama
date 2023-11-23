import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { ResponseApi } from '../interfaces/response-api';
import { Persona } from '../interfaces/persona';


@Injectable({
  providedIn: 'root'
})
export class UsuarioServicioService{

  apiBase: string = '/api/usuario/';
  apiUsuario: string = 'https://localhost:7220/api/Usuarios/Obtener?login=ADMIN&pass=12345';
  apiBaseUsuario: string = 'https://localhost:7220/api/Usuarios/';
  datos: ResponseApi[] = [];

  constructor(private http: HttpClient) { }

  public getDataLogin(): Observable<any> {
    return this.http.get<any>(this.apiUsuario);
  }

  getIniciarSesion(login: string, pass: string): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiBaseUsuario}Obtener?login=${login}&pass=${pass}`)
  }

  getUsuarios(): Observable<ResponseApi> {

    return this.http.get <ResponseApi>(`${this.apiBase}Lista`)

  }

  saveUsuario(request:Usuario): Observable<ResponseApi> {

    return this.http.post<ResponseApi>(`${this.apiBase}Guardar`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' }})

  }

  editUsuario(request: Usuario): Observable<ResponseApi> {

    return this.http.put<ResponseApi>(`${this.apiBase}Editar`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })

  }

deleteUsuario(id: number): Observable<ResponseApi> {

    return this.http.delete<ResponseApi>(`${this.apiBase}Eliminar/${id}`);

  }
}
