import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  ruta = `${environment.RUTA}/api/auth/signin`;

  TOKEN: string = environment.TOKEN;
  TOKEN_USUARIO: string = environment.TOKEN_USUARIO;
  TOKEN_PASSWORD: string = environment.TOKEN_PASSWORD;
  NOMBRE: string = environment.NOMBRE;
  IDUSUARIO: string = environment.IDUSUARIO;
  AREATRABAJO: string = environment.AREATRABAJO;
  DEPARTAMENTO: string = environment.DEPARTAMENTO;
  ROLES: string = environment.ROLES;

  constructor(
    private _httpClient: HttpClient,
    private _ruta: Router
  ) { }

  acceso(usuario: string, clave: string) {
    const body = `email=${encodeURIComponent(usuario)}&password=${encodeURIComponent(clave)}`;
    return this._httpClient.post(this.ruta, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Basic ' + btoa(this.TOKEN_USUARIO + ':' + this.TOKEN_PASSWORD)
        ),
    });
  }

  nombreLogueado(){
    const token = sessionStorage.getItem(this.NOMBRE);
    return token;
  }

  idLogueado(){
    const token = sessionStorage.getItem(this.IDUSUARIO);
    return token;
  }

  areatrabajoLogueado(){
    const token = sessionStorage.getItem(this.AREATRABAJO);
    return token;
  }

  departamentoLogueado(){
    const token = sessionStorage.getItem(this.DEPARTAMENTO);
    return token;
  }

  estaLogeado() {
    const token = sessionStorage.getItem(this.TOKEN);
    return !!token;
  }

  esRoladministradores(){
    const roles = sessionStorage.getItem(this.ROLES);
    if (roles.indexOf('ROLE_ADMINISTRADORES') >= 0) {
      return true;
    } else {
      return false;
    }
  }

  esRoloperador(){
    const roles = sessionStorage.getItem(this.ROLES);
    if (roles.indexOf('ROLE_OPERADOR') >= 0) {
      return true;
    } else {
      return false;
    }
  }

  cerrarSesion() {
    sessionStorage.clear();
    this._ruta.navigateByUrl('/acceso');
  }
}
