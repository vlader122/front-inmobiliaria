import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customers } from '../_modelo/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  ruta = `${environment.RUTA}/api/customers`;

  constructor(private _httpClient: HttpClient) {}

  datos(): Observable<Customers[]> {
    return this._httpClient.get<Customers[]>(`${this.ruta}/`);
  }

  cantidad(buscar: string): Observable<number> {
    return this._httpClient.get<number>(`${this.ruta}/`);
  }

  dato(id: number): Observable<Customers> {
    return this._httpClient.get<Customers>(`${this.ruta}/${id}`);
  }

  adicionar(dato: Customers): Observable<any> {
    return this._httpClient.post<void>(`${this.ruta}`, dato);
  }

  modificar(dato: Customers): Observable<any> {
    return this._httpClient.put<void>(`${this.ruta}`, dato);
  }

  eliminar(id: string): Observable<any> {
    return this._httpClient.delete<void>(`${this.ruta}/${id}`);
  }
}
