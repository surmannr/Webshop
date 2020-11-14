import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../classes/Product';
import { BASEURL } from './baseUrl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  constructor(private http: HttpClient) {
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }


  uploadFile(formData): Observable<any> {
    return this.http.post<any>(BASEURL.baseUrl + 'Upload', formData, { reportProgress: true, observe: 'events' }).pipe(catchError(this.handleError));     
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(BASEURL.baseUrl + 'Product');
  }

  get(id): Observable<Product> {
    return this.http.get<Product>(BASEURL.baseUrl + 'Product/' + id).pipe(catchError(this.handleError));
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
    return this.http.post<Product>(BASEURL.baseUrl + 'Product', data).pipe(catchError(this.handleError));
  }

  update(id, data): Observable<Product> {
    return this.http.put<Product>(BASEURL.baseUrl + 'Product/' + id, data).pipe(catchError(this.handleError));
  }

  delete(id): Observable<Product> {
    return this.http.delete<Product>(BASEURL.baseUrl + 'Product/' + id).pipe(catchError(this.handleError));
  } 
}
