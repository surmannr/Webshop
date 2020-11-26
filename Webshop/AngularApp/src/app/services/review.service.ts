import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Review } from '../classes/Review';
import { BASEURL } from '../services/BaseUrl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

 

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  /**
   * @description - Az adatbázisban tárolt összes felhasználói visszajelzést kérdezi le.
   * @returns Observable<Review[]> - A backend által visszaadott felhasználói visszajelzések tömbje
   * */
  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(BASEURL.baseUrl + 'Review');
  }
  /**
   * @description - Az adatbázisban tárolt felhasználói visszajelzések közül id alapján kérdez le
   * @param id - Az azonosítója annak a terméknek aminek felhasználói visszajelzéseit le kell kérni
   * @returns Observable<Review[]> - A termékhez tartozó visszajelzések tömbje
   */
  get(id): Observable<Review[]> {
    return this.http.get<Review[]>(BASEURL.baseUrl + 'Review/' + id).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy új visszajelzést hoz létre
   * @param data - Tartalmazza az adatokat amiből majd a backend létrehozza a visszajelzést
   */
  create(data): Observable<Review> {
    return this.http.post<Review>(BASEURL.baseUrl + 'Review', data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy visszajelzés adatait módosítja
   * @param id - A visszajelzés azonosítója amit a backend-nek módosítani kell
   * @param data - Tartalmazza a módosításhoz szükséges adatokat
   */
  update(id, data): Observable<Review> {
    return this.http.put<Review>(BASEURL.baseUrl + 'Review/' + id, data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy felhasználói visszajelzést töröl az adatbázisból
   * @param id - Az azonosítója a visszajelzésnek amit a backend-nek törölnie kell
   */
  delete(id): Observable<Review> {
    return this.http.delete<Review>(BASEURL.baseUrl + 'Review/' + id).pipe(catchError(this.handleError));
  }
}
