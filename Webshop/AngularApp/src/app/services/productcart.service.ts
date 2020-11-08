import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCart } from '../classes/ProductCart';
import { BASEURL } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductcartService {

 

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductCart[]> {
    return this.http.get<ProductCart[]>(BASEURL.baseUrl + 'ProductCart');
  }

  get(id): Observable<ProductCart[]> {
    return this.http.get<ProductCart[]>(BASEURL.baseUrl + 'ProductCart/' + id);
  }

  create(data): Observable<ProductCart> {
    return this.http.post<ProductCart>(BASEURL.baseUrl + 'ProductCart', data);
  }

  update(id, data): Observable<ProductCart> {
    return this.http.put<ProductCart>(BASEURL.baseUrl+ 'ProductCart/' + id, data);
  }

  delete(id): Observable<ProductCart> {
    return this.http.delete<ProductCart>(BASEURL.baseUrl+ 'ProductCart/' + id);
  }
}
