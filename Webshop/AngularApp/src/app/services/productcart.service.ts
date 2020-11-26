import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ProductCart } from '../classes/ProductCart';
import { BASEURL } from '../services/BaseUrl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductcartService {

 

  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  /**
   * @description - Az adatbázisban tárolt összes termék-kosár hozzárendelést kéri le
   * @returns Observable<ProductCart[]> - A backend által visszaküldött osszes hozzárendelés tömbje
   * */
  getAll(): Observable<ProductCart[]> {
    return this.http.get<ProductCart[]>(BASEURL.baseUrl + 'ProductCart');
  }

  /**
   * @description - Az adatbázisban tárolt termék-kosár hozzárendelések közül id alapján kérdez le
   * @param id - Az azonosítója annak a bejegyzésnek amit a backend-nek meg kell keresnie
   * @returns - Observable<ProductCart[]> - A backend által visszaküldött termék-kosár bejegyzések tömbje
   */
  get(id): Observable<ProductCart[]> {
    return this.http.get<ProductCart[]>(BASEURL.baseUrl + 'ProductCart/' + id).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy új termék-kosár bejegyzést hoz létre
   * @param data - Tartalmazza azokat az adatokat amik egy új termék-kosár bejegyzés létrehozásához szükségesek
   */
  create(data): Observable<ProductCart> {
    return this.http.post<ProductCart>(BASEURL.baseUrl + 'ProductCart', data).pipe(catchError(this.handleError));
  }
   
  /**
   * @description - Egy termék-kosár hozzárendelést töröl az adatbázisból
   * @param id - A törlendő hozzárendelés azonosítója
   */
  delete(id): Observable<ProductCart> {
    return this.http.delete<ProductCart>(BASEURL.baseUrl + 'ProductCart/' + id).pipe(catchError(this.handleError));
  }
}
