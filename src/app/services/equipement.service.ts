import { Injectable } from '@angular/core';
import { Equipement } from '../models/equipement';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Dotation } from '../models/dotation';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  private apiUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private httpClient : HttpClient) { }

  getEquipementList(equipement : Equipement[]): Observable<Equipement []> {
    return this.httpClient.get<Equipement[]>(`${this.apiUrl}/equipements`)
        .pipe(
          tap(_=> console.log("List d'equipement récupérée")),
          catchError(this.handleError<Equipement[]>('getEquipementList', []))
        );
  }

  addEquipement(equipement: Equipement): Observable<Equipement> {
    return this.httpClient.post<Equipement>(`${this.apiUrl}/equipements`, equipement, this.httpOptions).pipe(
      tap((newEqip: Equipement) => console.log(`Equipement ajoutée/ id=${newEqip.id}`)),
      catchError(this.handleError<Equipement>('addEquipement'))
    );
  }

  /** DELETE: supprimer un equipement */
  // deleteEquip(id: string): Observable<Equipement> {
  //   return this.httpClient.delete<Equipement>(`${this.apiUrl}/equipements/${id}`, this.httpOptions).pipe(
  //     tap(_ => console.log(`deleted equipement id=${id}`)),
  //     catchError(this.handleError<Equipement>('deleteEquipement'))
  //   );
  // }

  deleteEquip(id: number): Observable<Equipement> {
    return this.httpClient.delete<Equipement>(`${this.apiUrl}/equipements/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`deleted equipement id=${id}`)),
      catchError(this.handleError<Equipement>('deleteEquip'))
    );
  }

  /** GET equipement by id*/
  getEquipByID(id: string): Observable<Equipement> {
    return this.httpClient.get<Equipement>(`${this.apiUrl}/equipements/${id}`);
  }

  /** PUT: modifier un équipement  */
  updateEquip(equip: Equipement): Observable<Equipement> {
    return this.httpClient.put<Equipement>(`${this.apiUrl}/equipements/${equip.id}`, equip, this.httpOptions).pipe(
      tap(_ =>console.log(`updated equipement id=${equip.id}`)),
      catchError(this.handleError<Equipement>('Equipement'))
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

  //dotation

  getDotation(): Observable<Dotation[]> {
    return this.httpClient.get<Dotation[]>(`${this.apiUrl}/dotations/`)
    .pipe(
      tap(_=> console.log("List de dotation récupérée")),
      catchError(this.handleError<Dotation[]>('getDotation', []))
    );
  }

  /** POST: ajouter une déclaration*/
  addDotation(dotation: Dotation): Observable<Dotation> {
    return this.httpClient.post<Dotation>(`${this.apiUrl}/dotations`, dotation);
  }

  getDotationById(id: string): Observable<Dotation> {
    return this.httpClient.get<Dotation>(`${this.apiUrl}/dotations/${id}`)
      .pipe(
        tap(_ => console.log(`Dotation récupérée id=${id}`)),
        catchError(this.handleError<Dotation>(`getDotation id=${id}`))
      );
  }


  getCombinedData(): Observable<any[]> {
    return forkJoin([
      this.getDotation(),
      this.getEquipementList([])
    ]).pipe(
      map(([dotations, equipements]) =>
        dotations.map(dotation => {
          const equipementList = dotation.id_Equi.map(id =>
            equipements.find(e => e.id === id)
          );
          return {
            dotation: dotation,
            equipements: equipementList
          };
        })
      )
    );
      }


}
