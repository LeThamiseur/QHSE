import { Injectable } from '@angular/core';
import { Accinc } from '../models/accinc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class AccincService {

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

  // fonction pour générer le pdf d'un déclaration
  generatePdf(elementId : string, fileName : string) {
    const data = document.getElementById(elementId);

    if (data) {
      html2canvas (data).then(canvas => {
        const imgWidth = 210;
        const pageHeight = 297;
        const marginLeft = 20;
        const marginTop = 45;
        const contentWidth = imgWidth - 2 * marginLeft;
        const contentHeight = pageHeight - 2 * marginTop;
        const imgHeigft = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeigft;
        // const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p','mm','a4');

        while (heightLeft >= 0) {
          const position = heightLeft-pageHeight >= 0 ? contentHeight: heightLeft;
          pdf.addImage(canvas, 'PNG', marginLeft, marginTop, contentWidth, position, '', 'FAST');

          heightLeft -= pageHeight;

          if (heightLeft >= 0) {
            pdf.addPage();
          }
        }

        pdf.save(`${fileName}.pdf`);
      });
    }
  }
}
