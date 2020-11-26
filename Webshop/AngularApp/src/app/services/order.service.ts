import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Order } from '../classes/Order';
import { BASEURL } from './baseUrl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  /***
   * @description - Az adatbázisban tárolt összes rendelés lekérése
   * @returns Observable<Order[]> - A backend által visszadott összes rendelés tömbje
   */
  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(BASEURL.baseUrl + 'Order');
  }

  /**
   * @description - Az adatbázisban tárolt rendelések közül id alapján kérdez le
   * @param id - Az azonosítója annak a rendelésnek amit a backend-nek meg kell keresnie
   * @returns Observable<Order> - A backend által visszaküldött rendelés
   */
  get(id): Observable<Order> {
    return this.http.get<Order>(BASEURL.baseUrl + 'Order/' + id).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy új rendelést hoz létre
   * @param data - Tartalmazza az adatokat amik egy új rendelés létrehozásához szükségesek
   */
  create(data): Observable<Order> {
    return this.http.post<Order>(BASEURL.baseUrl + 'Order', data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy rendelés adatait módosítja
   * @param id - Az azonosítója annak a rendelésnek amit módosítani kell
   * @param data - Tartalmazza azokat az adatokat amik a módosításhoz szükségesek
   */
  update(id, data): Observable<Order> {
    return this.http.put<Order>(BASEURL.baseUrl + 'Order/' + id, data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy rendelést töröl az adatbázisból
   * @param id - Az azonosítója annak a rendelésnek amit törölni kell
   */
  delete(id): Observable<Order> {
    return this.http.delete<Order>(BASEURL.baseUrl + 'Order/' + id).pipe(catchError(this.handleError));
  }
}
