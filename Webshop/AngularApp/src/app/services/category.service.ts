import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../classes/Category';
import { BASEURL } from './baseUrl';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {  
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
   * @description - Az adatbázisban tárolt összes kategóriát kéri le
   * @returns Observable<Category[]> - A backend által visszaadott összes kategória tömbje
   * */
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(BASEURL.baseUrl + 'Category');
  }

  /**
   * @description - Az adatbázisban tárolt kategóriák közül id alapján kérdez le
   * @param id - Az azonosítója annak a kosárnak amit a backend-nek meg kell keresnie
   * @return Observable<Category> - A backend által visszaküldött kategória
   */
  get(id): Observable<Category> {
    return this.http.get<Category>(BASEURL.baseUrl + 'Category/' + id).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy új kategóriát hoz létre
   * @param data - Tartalmazza az adatokat amik egy új kategória létrehozásához szükségesek
   */
  create(data): Observable<Category> {
    return this.http.post<Category>(BASEURL.baseUrl + 'Category', data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy kategória adatait módosítja
   * @param id - Az azonosítója annak a kategóriának amit módosítani kell
   * @param data - Tartalmazza azokat az adatokat amik a módosításhoz szükségesek
   */
  update(id, data): Observable<Category> {
    return this.http.put<Category>(BASEURL.baseUrl + 'Category/' + id, data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy kategóriát töröl az adatbázisból
   * @param id - A törlendő kategória azonosítója
   */
  delete(id): Observable<Category> {
    return this.http.delete<Category>(BASEURL.baseUrl + 'Category/' + id).pipe(catchError(this.handleError));
  }
}
