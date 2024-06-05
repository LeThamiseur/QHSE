import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SituationD } from '../models/situation-D';

@Injectable({
  providedIn: 'root'
})
export class DangRiskService {

  private apiUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private httpclient: HttpClient) { }

 /** GET dangerList */
  getDangRisk(danger: SituationD[]): Observable<SituationD[]> {
    return this.httpclient.get<SituationD[]>(`${this.apiUrl}/dangers`)
    .pipe(
      tap(_ => console.log('List récupérée')),
      catchError(this.handleError<SituationD[]>('getDangRiskList', []))
    );
  }

   /** GET danger by id*/
   getDangRById(id: string): Observable<SituationD> {
    return this.httpclient.get<SituationD>(`${this.apiUrl}/dangers/${id}`);
  }

  /** PUT: modifier une situation dangereuse  */
  updateDang(danger: SituationD): Observable<SituationD> {
    return this.httpclient.put<SituationD>(`${this.apiUrl}/dangers/${danger.id}`, danger, this.httpOptions).pipe(
      tap(_ =>console.log(`updated danger id=${danger.id}`)),
      catchError(this.handleError<SituationD>('danger'))
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
