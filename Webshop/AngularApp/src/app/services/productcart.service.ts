import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ProductCart } from '../classes/ProductCart';
import { BASEURL } from './baseUrl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductcartService {

 

  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getAll(): Observable<ProductCart[]> {
    return this.http.get<ProductCart[]>(BASEURL.baseUrl + 'ProductCart');
  }

  get(id): Observable<ProductCart[]> {
    return this.http.get<ProductCart[]>(BASEURL.baseUrl + 'ProductCart/' + id).pipe(catchError(this.handleError));
  }

  create(data): Observable<ProductCart> {
    return this.http.post<ProductCart>(BASEURL.baseUrl + 'ProductCart', data).pipe(catchError(this.handleError));
  }
   

  delete(id): Observable<ProductCart> {
    return this.http.delete<ProductCart>(BASEURL.baseUrl + 'ProductCart/' + id).pipe(catchError(this.handleError));
  }
}
