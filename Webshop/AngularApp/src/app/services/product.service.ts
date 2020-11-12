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



  uploadFile(formData): Observable<any> {
    return this.http.post<any>(BASEURL.baseUrl + 'Upload', formData, { reportProgress: true, observe: 'events' });     
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(BASEURL.baseUrl + 'Product');
  }

  get(id): Observable<Product> {
    return this.http.get<Product>(BASEURL.baseUrl+ 'Product/' + id);
  }

  GetProductsByProductName(ProductNameForFiltering: string): Observable<Product[]> {
    return this.http.get<Product[]>(BASEURL.baseUrl + 'Product/FilterByProductName/' + ProductNameForFiltering);
  }

  GetProductsByCategoryId(categoryIdForFiltering: number): Observable<Product[]> {
    return this.http.get<Product[]>(BASEURL.baseUrl + 'Product/FilterByCategoryId/' + categoryIdForFiltering.toString());
  }

  GetByCategoryIdAndProductName(categoryIdForFiltering: number, ProductNameForFiltering: string): Observable<Product[]> {
    return this.http.get<Product[]>(BASEURL.baseUrl + 'Product/FilterByCategoryIdAndProductName/1%2Ckarora?categoryIdForFiltering='
      + categoryIdForFiltering.toString() + '&ProductNameForFiltering=' + ProductNameForFiltering);
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
