import { Injectable } from '@angular/core';
import { Accinc } from '../models/accinc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccincService {

  // private apiU = 'http://qhse-api.runasp.net/api/situation';

  private apiUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpclient: HttpClient) {}

 getAccIncList(accinc:Accinc[]): Observable<Accinc[]> {
    return this.httpclient.get<Accinc[]>(`${this.apiUrl}/acc_inc`)
    .pipe(
      tap(_ => console.log('AccIncList récupérée')),
      catchError(this.handleError<Accinc[]>('getAccIncList', []))
    );
  }

  // voir une déclaration
  getAccincByID(id: string): Observable<Accinc> {
    return this.httpclient.get<Accinc>(`${this.apiUrl}/acc_inc/${id}`);
  }

  /** PUT: modifier une déclaration  */
  updateAccinc(accinc: Accinc): Observable<Accinc> {
    return this.httpclient.put<Accinc>(`${this.apiUrl}/acc_inc/${accinc.id}`, accinc, this.httpOptions).pipe(
      tap(_ =>console.log(`updated AccInc id=${accinc.id}`)),
      catchError(this.handleError<Accinc>('AccInc'))
    );
  }
   /** POST: ajouter une déclaration*/
   addAccident(accidentData: Accinc): Observable<Accinc> {
      return this.httpclient.post<Accinc>(`${this.apiUrl}/acc_inc`, accidentData);
    }

    /** DELETE: supprimer une déclaration */
    deleteAccinc(id: string): Observable<Accinc> {
      return this.httpclient.delete<Accinc>(`${this.apiUrl}/acc_inc/${id}`, this.httpOptions).pipe(
        tap(_ => console.log(`deleted accinc id=${id}`)),
        catchError(this.handleError<Accinc>('deleteHero'))
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
