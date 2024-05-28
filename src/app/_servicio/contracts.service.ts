import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contracts } from '../_modelo/contracts';
import { Contracts2 } from '../_modelo/customers';


@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  ruta = `${environment.RUTA}/api/contracts`;

  constructor(private _httpClient: HttpClient) {}

  datos(): Observable<Contracts[]> {
    return this._httpClient.get<Contracts[]>(`${this.ruta}/`);
  }

  cantidad(buscar: string): Observable<number> {
    return this._httpClient.get<number>(`${this.ruta}/`);
  }

  dato(id: number): Observable<Contracts> {
    return this._httpClient.get<Contracts>(`${this.ruta}/${id}`);
  }

  adicionar(dato: Contracts): Observable<any> {
    return this._httpClient.post<void>(`${this.ruta}`, dato);
  }

  modificar(dato: Contracts): Observable<any> {
    return this._httpClient.put<void>(`${this.ruta}`, dato);
  }

  eliminar(id: string): Observable<any> {
    return this._httpClient.delete<void>(`${this.ruta}/${id}`);
  }

  contratosActivos(): Observable<Contracts2[]> {
    return this._httpClient.get<Contracts2[]>(`${this.ruta}/report/active-contracts`);
  }
}
