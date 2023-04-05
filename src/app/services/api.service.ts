import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Conta } from 'src/models/api';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private baseUrl = 'http://localhost:3000/contas';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getContas(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<Conta[]>('getContas', []))
      );
  }

  getConta(id: string): Observable<Conta> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Conta>(url)
      .pipe(
        catchError(this.handleError<Conta>('getConta'))
      );
  }

  postConta(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.baseUrl, conta, this.httpOptions)
      .pipe(
        tap((newConta: Conta) => console.log(`Conta cadastrada com sucesso! id=${newConta.count}`)),
        catchError(this.handleError<Conta>('postConta'))
      );
  }

  updateConta(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateConta'))
      );
  }

  deleteConta(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteConta'))
      );
  }

  depositar(id: string, valor: number): Observable<any> {
    const url = `${this.baseUrl}/${id}/depositar`;
    const data = { valor: valor };
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('depositar'))
      );
  }

  sacar(id: string, valor: number): Observable<any> {
    const url = `${this.baseUrl}/${id}/sacar`;
    const data = { valor: valor };
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('sacar'))
      );
  }

  transferir(idOrigem: string, idDestino: string, valor: number): Observable<any> {
    const url = `${this.baseUrl}/${idOrigem}/transferir`;
    const data = { contaDestino: idDestino, valor: valor };
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('transferir'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }

}

