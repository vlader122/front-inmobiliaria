import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Propertys } from '../_modelo/propertys';

@Injectable({
  providedIn: 'root'
})
export class PropertysService {

  ruta = `${environment.RUTA}/api/propertys`;

  constructor(private _httpClient: HttpClient) {}

  datos(): Observable<Propertys[]> {
    return this._httpClient.get<Propertys[]>(`${this.ruta}/`);
  }

  cantidad(buscar: string): Observable<number> {
    return this._httpClient.get<number>(`${this.ruta}/`);
  }

  dato(id: number): Observable<Propertys> {
    return this._httpClient.get<Propertys>(`${this.ruta}/${id}`);
  }

  adicionar(dato: Propertys): Observable<any> {
    return this._httpClient.post<void>(`${this.ruta}`, dato);
  }

  modificar(dato: Propertys): Observable<any> {
    return this._httpClient.put<void>(`${this.ruta}`, dato);
  }

  eliminar(id: string): Observable<any> {
    return this._httpClient.delete<void>(`${this.ruta}/${id}`);
  }
}
