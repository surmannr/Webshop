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
  getByOrderId(orderId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(BASEURL.baseUrl + 'OrderItem/getByOrderId/' + orderId).pipe(catchError(this.handleError));;
  }
  getAll(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(BASEURL.baseUrl + 'OrderItem');
  }

  get(id): Observable<OrderItem> {
    return this.http.get<OrderItem>(BASEURL.baseUrl + 'OrderItem/' + id).pipe(catchError(this.handleError));;
  }

  create(data): Observable<OrderItem> {
    return this.http.post<OrderItem>(BASEURL.baseUrl + 'OrderItem', data).pipe(catchError(this.handleError));
  }

  update(id, data): Observable<OrderItem> {
    return this.http.put<OrderItem>(BASEURL.baseUrl + 'OrderItem/' + id, data).pipe(catchError(this.handleError));
  }

  delete(id): Observable<OrderItem> {
    return this.http.delete<OrderItem>(BASEURL.baseUrl + 'OrderItem/' + id).pipe(catchError(this.handleError));
  }

}
