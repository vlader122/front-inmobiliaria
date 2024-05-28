import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Roles } from '../_modelo/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  ruta = `${environment.RUTA}/api/v1/roles`;

  constructor(private _httpClient: HttpClient) {}

  buscarTodos(): Observable<Roles[]> {
    return this._httpClient.get<Roles[]>(`${this.ruta}/todos`);
  }

  datos( pagina: number, cantidad: number, buscar: string): Observable<Roles[]> {
    return this._httpClient.get<Roles[]>(`${this.ruta}/?pagina=${pagina}&cantidad=${cantidad}&termino=${buscar}`);
  }

  cantidad(buscar: string): Observable<number> {
    return this._httpClient.get<number>(`${this.ruta}/cantidad?termino=${buscar}`);
  }

  dato(id: number): Observable<Roles> {
    return this._httpClient.get<Roles>(`${this.ruta}/${id}`);
  }

  adicionar(dato: Roles): Observable<any> {
    return this._httpClient.post<void>(`${this.ruta}`, dato);
  }

  modificar(dato: Roles): Observable<any> {
    return this._httpClient.put<void>(`${this.ruta}`, dato);
  }

}
