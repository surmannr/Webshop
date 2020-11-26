import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { OrderItem } from '../classes/OrderItem';
import { BASEURL } from './baseUrl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {

 
  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  /**
   * @description -  Az adatbázisban tárolt rendelés-termék táblából orderId alapján kérdez le
   * @param orderId - A rendelés azonosítója annak a bejegyzésnek amit a backend-nek meg kell keresnie
   * @returns Observable<OrderItem[]> A backend által visszaküldött rendelés termékeinek tömbje
   */
  getByOrderId(orderId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(BASEURL.baseUrl + 'OrderItem/getByOrderId/' + orderId).pipe(catchError(this.handleError));;
  }

  /**
   * @description - Az adatbázisban tárolt összes rendelés termékeinek lekérdezése
   * @returns Observable<OrderItem[]> - A backend által visszaküldött rendelések termékeinek tömbje
   * */
  getAll(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(BASEURL.baseUrl + 'OrderItem');
  }

  /**
   * @description - Az adatbázisban tárolt rendelés-termék táblából id alapján kérdez le
   * @param id - Az egyéni azonosítója annak a bejegyzésnek amit a backend-nek meg kell keresnie
   */
  get(id): Observable<OrderItem> {
    return this.http.get<OrderItem>(BASEURL.baseUrl + 'OrderItem/' + id).pipe(catchError(this.handleError));;
  }

  /**
   * @description - Egy új rendelés-termék kapcsolat létrehozása
   * @param data - Tartalmazza az adatokat amik az új bejegyzés létrehozásához szükségesek
   */
  create(data): Observable<OrderItem> {
    return this.http.post<OrderItem>(BASEURL.baseUrl + 'OrderItem', data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy rendelés-termék hozzárendelés adatait módosítja
   * @param id - Az egyéni azonosítója annak a rendelés-termék hozzárendelésnek amit módosítani kell
   * @param data - Tartalmazza a módosításhoz szükséges adatokat
   */
  update(id, data): Observable<OrderItem> {
    return this.http.put<OrderItem>(BASEURL.baseUrl + 'OrderItem/' + id, data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Az adatbázisból töröl egy rendelés-termék hozzárendelést
   * @param id - Az egyéni azonosítója a törlendő bejegyzésnek
   */
  delete(id): Observable<OrderItem> {
    return this.http.delete<OrderItem>(BASEURL.baseUrl + 'OrderItem/' + id).pipe(catchError(this.handleError));
  }

}
