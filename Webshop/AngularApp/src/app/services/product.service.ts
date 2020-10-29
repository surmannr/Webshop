import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../classes/Product';
import { BASEURL } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly baseUrl = 'https://localhost:44308/api/Product';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(BASEURL.baseUrl + 'Product');
  }

  get(id): Observable<Product> {
    return this.http.get<Product>(BASEURL.baseUrl+ 'Product/' + id);
  }

  create(data): Observable<Product> {
    return this.http.post<Product>(BASEURL.baseUrl + 'Product', data);
  }

  update(id, data): Observable<Product> {
    return this.http.put<Product>(BASEURL.baseUrl+ 'Product/' + id, data);
  }

  delete(id): Observable<Product> {
    return this.http.delete<Product>(BASEURL.baseUrl+ 'Product/' + id);
  }
}
