import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Usuario } from '../shared/usuario';
import { baseURL } from '../shared/baseURL';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  usuarioLogado!: Usuario;

  constructor(
    private http: HttpClient,
    private processHTTPMsg: ProcessHTTPMsgService
  ) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(baseURL + 'usuarios')
      .pipe(catchError(this.processHTTPMsg.handleError));
  }

  getUsuario(id: string): Observable<Usuario> {
    return this.http
      .get<Usuario>(baseURL + 'usuarios/' + id)
      .pipe(catchError(this.processHTTPMsg.handleError));
  }

  getFeaturedUsuario(): Observable<Usuario> {
    return this.http
      .get<Usuario[]>(baseURL + 'usuarios?featured=true')
      .pipe(map((usuarios) => usuarios[0]))
      .pipe(catchError(this.processHTTPMsg.handleError));
  }

  getUsuarioIds(): Observable<string[] | any> {
    return this.getUsuarios()
      .pipe(map((usuarios) => usuarios.map((usuario) => usuario.id)))
      .pipe(catchError((error) => error));
  }

  postUsuario(usuario: Usuario): Observable<Usuario>{
    const httpOpttions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Usuario>(baseURL + 'usuarios/', usuario, httpOpttions)
      .pipe(catchError(this.processHTTPMsg.handleError));
  }

  putUsuario(usuario: Usuario): Observable<Usuario>{
    const httpOpttions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Usuario>(baseURL + 'usuarios/' +  usuario.id, usuario, httpOpttions)
      .pipe(catchError(this.processHTTPMsg.handleError));
  }

  setUsuarioLogado(usuario: Usuario){
    this.usuarioLogado = usuario;
  }

  getUsuarioLogado():Usuario{
    return this.usuarioLogado;
  }

}
