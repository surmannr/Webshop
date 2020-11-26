import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../classes/Product';
import { BASEURL } from './baseUrl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  constructor(private http: HttpClient) {
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  /**
   * @description - A backend szerverre egy képet tölt fel
   * @param formData - A feltöltendő kép adatait tartalmazza
   */
  uploadFile(formData): Observable<any> {
    return this.http.post<any>(BASEURL.baseUrl + 'Upload', formData, { reportProgress: true, observe: 'events' }).pipe(catchError(this.handleError));     
  }

  /**
   * @description - Az adatbázisban tárolt összes terméket kéri le
   * @returns Observable<Product[]> - A backend által visszadott összes termék tömbje
   * */
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(BASEURL.baseUrl + 'Product');
  }

  /**
   * @description Az adatbázisban tárolt termékek közül id alapján kérdez le
   * @param id - Az azonosítója annak  terméknek amit a backend-nek meg kell keresnie
   * @returns Observable<Product> - A backend által visszaküldött termék
   */
  get(id): Observable<Product> {
    return this.http.get<Product>(BASEURL.baseUrl + 'Product/' + id).pipe(catchError(this.handleError));
  }

  /**
   * @description - A termékek szűrése kategória azonosító és termék név alapján
   * @param categoryIdForFiltering - A szűréshez használt kategória egyéni azonosítója
   * @param ProductNameForFiltering - A szűréshez használt termék neve
   * @returns Observable<Product[]> - A backend által a szűrés eredményeként kapott tömb
   */
  GetByCategoryIdAndProductName(categoryIdForFiltering: number, ProductNameForFiltering: string): Observable<Product[]> {
    return this.http.get<Product[]>(BASEURL.baseUrl + 'Product/FilterByCategoryIdAndProductName/1%2Ckarora?categoryIdForFiltering='
      + categoryIdForFiltering.toString() + '&ProductNameForFiltering=' + ProductNameForFiltering);
  }

  /**
   * @description - Egy új terméket hoz létre
   * @param data - Tartalmazza az adatokat amik egy új termék létrehozásához szükségesek
   */
  create(data): Observable<Product> {
    return this.http.post<Product>(BASEURL.baseUrl + 'Product', data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy termék adatait módosítja
   * @param id - Az azonosítója annak a terméknek amit módosítani kell
   * @param data - Tartalmazza azokat az adatokat amik a módosításhoz szükségesek
   */
  update(id, data): Observable<Product> {
    return this.http.put<Product>(BASEURL.baseUrl + 'Product/' + id, data).pipe(catchError(this.handleError));
  }

  /**
   * @description - A terméket törli az adatbázisból
   * @param id - A törlendő termék azonosítója
   */
  delete(id): Observable<Product> {
    return this.http.delete<Product>(BASEURL.baseUrl + 'Product/' + id).pipe(catchError(this.handleError));
  } 
}
