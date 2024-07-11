import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { DocU } from '../models/docU';

@Injectable({
  providedIn: 'root'
})
export class Duer {

  private apiUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpclient: HttpClient) { }

  getDocU(): Observable<DocU[]> {
    return this.httpclient.get<DocU[]>(`${this.apiUrl}/Doc_U`)
    .pipe(
      tap(_ => console.log('Liste DocU recupérée')),
      catchError(this.handleError<DocU[]>('getDocU', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
