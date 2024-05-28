import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Enlaces } from '../_modelo/enlaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnlacesService {

  ruta = `${environment.RUTA}/api/v1/enlaces`;

  constructor(private _httpClient: HttpClient) {}

  buscarPorTermino(termino: string, pagina: number, cantidad: number): Observable<Enlaces[]> {
    return this._httpClient.get<Enlaces[]>(`${this.ruta}/?pagina=${pagina}&cantidad=${cantidad}&termino=${termino}`);
  }

  cantidadBuscarPorTermino(termino: string): Observable<number> {
    return this._httpClient.get<number>(`${this.ruta}/cantidad?termino=${termino}`);
  }

  buscarTodos(): Observable<Enlaces[]> {
    return this._httpClient.get<Enlaces[]>(`${this.ruta}/todosPrincipales`);
  }

  buscarPorId(id: number): Observable<Enlaces>{
    return this._httpClient.get<Enlaces>(`${this.ruta}/${id}`);
  }

  adicionar(dato: Enlaces): Observable<any>{
    return this._httpClient.post<any>(`${this.ruta}`, dato);
  }

  modificar(dato: Enlaces): Observable<any>{
    return this._httpClient.put<any>(`${this.ruta}`, dato);
  }

}
