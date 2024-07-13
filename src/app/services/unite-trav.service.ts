import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { UTrav } from '../models/u-trav';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class UniteTravService {

  private apiUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpclient: HttpClient) { }

  // unité de travail

    // Afficher la liste des UT

            getUniteTravail(): Observable<UTrav[]> {
              return this.httpclient.get<UTrav[]>(`${this.apiUrl}/Unite_Travail`)
              .pipe(
                tap(_=> console.log('Liste Unite travail recupérée')),
                catchError( this.handleError<UTrav[]>('getUniteTravail', []))
              );
            }

            // Ajouter une unité de travail
            addUT(unite: UTrav): Observable<UTrav> {
              return this.httpclient.post<UTrav>(`${this.apiUrl}/Unite_Travail`, unite, this.httpOptions).pipe(
                tap((newUnit: UTrav) => console.log(`Unite ajoutée/ id=${newUnit.id}`)),
                catchError(this.handleError<UTrav>('addUT'))
              );
            }

            // /** GET unit by id*/
            getUnitByID(id: number): Observable<UTrav> {
              return this.httpclient.get<UTrav>(`${this.apiUrl}/Unite_Travail/${id}`);
            }

            // /** PUT: modifier une UT  */
            updateUT(unite: UTrav): Observable<UTrav> {
              return this.httpclient.put<UTrav>(`${this.apiUrl}/Unite_Travail/${unite.id}`, unite, this.httpOptions).pipe(
                tap(_ =>console.log(`updated unit id=${unite.id}`)),
                catchError(this.handleError<UTrav>('UpdateUT'))
              );
            }

            /** DELETE: supprimer une UT */
            deleteUT(id: number): Observable<UTrav> {
              return this.httpclient.delete<UTrav>(`${this.apiUrl}/Unite_Travail/${id}`, this.httpOptions).pipe(
                tap(_ => console.log(`deleted unit id=${id}`)),
                catchError(this.handleError<UTrav>('deleteHero'))
              );
            }

            // methode pour récupérer les tâches par UT
            getTasksByUniteTravail(id_UT: number): Observable<Task[]> {
              return this.httpclient.get<Task[]>(`${this.apiUrl}/Tache?id_UT=${id_UT}`)
              .pipe(
                tap(_ => console.log(`Tâches récupérées pour l'unité de travail ${id_UT}`)),
                catchError(this.handleError<Task[]>('getTasksByUniteTravail', []))
              );
            }


  // Tache
            // Afficher tâche
            getTaskList(): Observable<Task[]> {
              return this.httpclient.get<Task[]>(`${this.apiUrl}/Tache`)
              .pipe(
                tap(_=> console.log('Liste de tâche recupérée')),
                catchError( this.handleError<Task[]>('getTaskList', []))
              );
            }

            // Ajouter une tâche
            addTask(task: Task): Observable<Task> {
              return this.httpclient.post<Task>(`${this.apiUrl}/Tache`, task, this.httpOptions).pipe(
                tap((newTask: Task) => console.log(`Tache ajoutée/ id=${newTask.id}`)),
                catchError(this.handleError<Task>('addTask'))
              );
            }

            /** DELETE: supprimer une tâche */
            deleteTask(id: number): Observable<Task> {
              return this.httpclient.delete<Task>(`${this.apiUrl}/Tache/${id}`, this.httpOptions).pipe(
                tap(_ => console.log(`deleted task id=${id}`)),
                catchError(this.handleError<Task>('deleteHero'))
              );
            }

            // /** GET task by id*/
            getTaskByID(id: number): Observable<Task> {
              return this.httpclient.get<Task>(`${this.apiUrl}/Tache/${id}`);
            }

            // /** PUT: modifier une tâche  */
            updateTask(task: Task): Observable<Task> {
              return this.httpclient.put<Task>(`${this.apiUrl}/Tache/${task.id}`, task, this.httpOptions).pipe(
                tap(_ =>console.log(`updated task id=${task.id}`)),
                catchError(this.handleError<Task>('UpdateUT'))
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
