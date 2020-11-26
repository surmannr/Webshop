import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Supplier } from '../classes/Supplier';
import { BASEURL } from '../services/BaseUrl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

 

  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  /**
   * @description - Az adatbázisban tárolt beszállítókat lekéri
   * @returns Observable<Supplier[]> - A backend által visszaadott beszállítók tömbje
   * */
  getAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(BASEURL.baseUrl + 'Supplier');
  }

  /**
   * @description - Az adatbázisban tárolt beszállítók id alapján való lekérése
   * @param id - A beszállító egyéni azonosítója
   * @returns Observable<Supplier> - A backend által visszadott beszállító
   */
  get(id): Observable<Supplier> {
    return this.http.get<Supplier>(BASEURL.baseUrl + 'Supplier/' + id).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy új beszállító létrehozása
   * @param data - Tartalmazza az adatokat egy új beszállító létrehozásához
   */
  create(data): Observable<Supplier> {
    return this.http.post<Supplier>(BASEURL.baseUrl + 'Supplier', data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy beszállító adatait módosítja
   * @param id - Az azonosítója a módosítandó beszállítónak
   * @param data - Tartalmazza a módosításhoz szükséges adatokat
   */
  update(id, data): Observable<Supplier> {
    return this.http.put<Supplier>(BASEURL.baseUrl + 'Supplier/' + id, data).pipe(catchError(this.handleError));
  }

  /**
   * @description - egy beszállítót töröl az adatbázisból
   * @param id - A törlendő beszállító azonosítója
   */
  delete(id): Observable<Supplier> {
    return this.http.delete<Supplier>(BASEURL.baseUrl + 'Supplier/' + id).pipe(catchError(this.handleError));
  }
}
