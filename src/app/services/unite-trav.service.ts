import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { UTrav } from '../models/u-trav';

@Injectable({
  providedIn: 'root'
})
export class UniteTravService {

  private apiUrl = 'http://localhost:3000';

  constructor(private httpclient: HttpClient) { }

  getUniteTravail(): Observable<UTrav[]> {
    return this.httpclient.get<UTrav[]>(`${this.apiUrl}/Unite_Travail`)
    .pipe(
      tap(_=> console.log('Liste Unite travail recupérée')),
      catchError( this.handleError<UTrav[]>('getUniteTravail', []))
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
