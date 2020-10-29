import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderItem } from '../classes/OrderItem';
import { BASEURL } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {

 
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(BASEURL.baseUrl + 'OrderItem');
  }

  get(id): Observable<OrderItem> {
    return this.http.get<OrderItem>(BASEURL.baseUrl + 'OrderItem/' + id);
  }

  create(data): Observable<OrderItem> {
    return this.http.post<OrderItem>(BASEURL.baseUrl + 'OrderItem', data);
  }

  update(id, data): Observable<OrderItem> {
    return this.http.put<OrderItem>(BASEURL.baseUrl + 'OrderItem/' + id, data);
  }

  delete(id): Observable<OrderItem> {
    return this.http.delete<OrderItem>(BASEURL.baseUrl+ 'OrderItem/' + id);
  }
}
