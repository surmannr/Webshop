import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../classes/Cart';
import { BASEURL } from './baseUrl';







@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>(BASEURL.baseUrl + 'Cart');
  }

  get(id): Observable<Cart> {
    return this.http.get<Cart>(BASEURL.baseUrl + 'Cart/' + id);
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
