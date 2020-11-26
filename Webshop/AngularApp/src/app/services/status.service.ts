import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BASEURL } from '../services/BaseUrl';
import { Status } from '../classes/Status';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService { 
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  /**
   * @description - Az adatbázisban tárolt státuszok közül id alapján kérdez le
   * @param id - Az azonosítója a státusznak amit a backend-nek meg kell keresnie
   * @returns Observable<Status> - A backend által visszaadott státusz 
   */
  get(id: number): Observable<Status> {
    return this.http.get<Status>(BASEURL.baseUrl + 'Status/' + id).pipe(catchError(this.handleError));
  }

  /**
   * @description - Az adatbázisban tárolt összes státuszt lekéri
   * @returns Observable<Status[]> - Az adatbázisban tárolt státuszok tömbje
   * */
  getAll(): Observable<Status[]> {
    return this.http.get<Status[]>(BASEURL.baseUrl + 'Status/');
  }
}
