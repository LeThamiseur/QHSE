import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SituationD } from '../models/situation-D';
import { RisqueP } from '../models/RisqueP';

@Injectable({
  providedIn: 'root'
})
export class DangRiskService {

  private apiUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private httpclient: HttpClient) { }

  // danger

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

  addDang(danger: SituationD): Observable<SituationD> {
    return this.httpclient.post<SituationD>(`${this.apiUrl}/dangers`, danger, this.httpOptions).pipe(
      tap((newDang: SituationD) => console.log(`SD ajoutée/ id=${newDang.id}`)),
      catchError(this.handleError<SituationD>('addDang'))
    );
  }

  deleteDang(id: string): Observable<SituationD> {
    return this.httpclient.delete<SituationD>(`${this.apiUrl}/dangers/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`deleted danger id=${id}`)),
      catchError(this.handleError<SituationD>('deleteDang'))
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



  updateRisk(dangerId: string, riskId: string, riskData: RisqueP): Observable<any> {
    return this.httpclient.put<any>(`${this.apiUrl}/dangers/${dangerId}/risques/${riskId}`, riskData, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated risk id=${riskId}`)),
        catchError(this.handleError<any>('updateRisk'))
      );
  }

}
