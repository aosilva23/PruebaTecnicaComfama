import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioBeta } from '../interfaces/usuarioBeta';
import { ResponseApi } from '../interfaces/response-api';
import { Persona } from '../interfaces/persona';


@Injectable({
  providedIn: 'root'
})
export class UsuarioBetaService{

  apiBaseUsuario: string = 'https://localhost:7220/api/Usuarios/';

  constructor(private http: HttpClient) { }

  getIniciarSesion(login: string, pass: string): Observable<UsuarioBeta[]> {
    return this.http.get<UsuarioBeta[]>(`${this.apiBaseUsuario}Obtener?login=${login}&pass=${pass}`)
  }

  saveUsuario(request: UsuarioBeta): Observable<UsuarioBeta> {
    request.fechaCreacion = "2023-11-21T22:21:47.462Z";
    return this.http.post<UsuarioBeta>(`${this.apiBaseUsuario}Guardar`, request)
  }

  getUsuarios(): Observable<UsuarioBeta[]> {
    return this.http.get<UsuarioBeta[]>(`${this.apiBaseUsuario}Lista`)
  }

}
