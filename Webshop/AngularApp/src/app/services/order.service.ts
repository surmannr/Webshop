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

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(BASEURL.baseUrl + 'Order');
  }

  get(id): Observable<Order> {
    return this.http.get<Order>(BASEURL.baseUrl + 'Order/' + id).pipe(catchError(this.handleError));
  }

  create(data): Observable<Order> {
    return this.http.post<Order>(BASEURL.baseUrl + 'Order', data).pipe(catchError(this.handleError));
  }

  update(id, data): Observable<Order> {
    return this.http.put<Order>(BASEURL.baseUrl + 'Order/' + id, data).pipe(catchError(this.handleError));
  }

  delete(id): Observable<Order> {
    return this.http.delete<Order>(BASEURL.baseUrl + 'Order/' + id).pipe(catchError(this.handleError));
  }
}
