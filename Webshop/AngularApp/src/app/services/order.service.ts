import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../classes/Order';
import { BASEURL } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(BASEURL.baseUrl + 'Order');
  }

  get(id): Observable<Order> {
    return this.http.get<Order>(BASEURL.baseUrl + 'Order/' + id);
  }

  create(data): Observable<Order> {
    return this.http.post<Order>(BASEURL.baseUrl + 'Order', data);
  }

  update(id, data): Observable<Order> {
    return this.http.put<Order>(BASEURL.baseUrl + 'Order/' + id, data);
  }

  delete(id): Observable<Order> {
    return this.http.delete<Order>(BASEURL.baseUrl + 'Order/' + id);
  }
}
