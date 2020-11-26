import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cart } from '../classes/Cart';
import { BASEURL } from '../services/BaseUrl';
import { catchError } from 'rxjs/operators';







@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  /**
   * @description - Az adatbázisban tárolt összes kosarat lekéri
   * @returns Obsersable<Cart[]> - A backend által visszadott összes kosár tömbje
   * */
  getAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>(BASEURL.baseUrl + 'Cart');
  }


  /**
   * @description - Az adatbázisban tárolt kosarak közül id alapján kérdez le
   * @param id - Az azonosítója annak a kosárnak amit a backend-nek meg kell keresnie
   * @return Observable<Cart> - A backend által visszadott kosár
   */
  get(id): Observable<Cart> {
    return this.http.get<Cart>(BASEURL.baseUrl + 'Cart/' + id).pipe(catchError(this.handleError));;
  }

  /**
   * @description - Egy új kosarat hoz létre
   * @param data - Az az adatszerkezet amiből majd a backend létrehozza a kosarat   
   */
  create(data): Observable<Cart> {
    return this.http.post<Cart>(BASEURL.baseUrl + 'Cart', data);
  }

  /**
   * @description - Egy kosár adatait módosítja
   * @param id - Az azonosítója annak a kosárnap amit a backend-nek módosítania kell
   * @param data - Az az adatszerkezet ami a módosításhoz szükséges adatokat tartalmazza
   */
  update(id, data): Observable<Cart> {
    return this.http.put<Cart>(BASEURL.baseUrl + 'Cart/' + id, data);
  }

  /**
   * @description - Egy kosarat töröl ki az adatbázisból
   * @param id - Az azonosítója annak a kosárnak amit a backend-nek törölnie kell
   */
  delete(id): Observable<Cart> {
    return this.http.delete<Cart>(BASEURL.baseUrl + 'Cart/' + id);
  }
}
