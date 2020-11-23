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


  getAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>(BASEURL.baseUrl + 'Cart');
  }

  get(id): Observable<Cart> {
    return this.http.get<Cart>(BASEURL.baseUrl + 'Cart/' + id).pipe(catchError(this.handleError));;
  }

  create(data): Observable<Cart> {
    return this.http.post<Cart>(BASEURL.baseUrl + 'Cart', data);
  }

  update(id, data): Observable<Cart> {
    return this.http.put<Cart>(BASEURL.baseUrl + 'Cart/' + id, data);
  }

  delete(id): Observable<Cart> {
    return this.http.delete<Cart>(BASEURL.baseUrl + 'Cart/' + id);
  }
}
