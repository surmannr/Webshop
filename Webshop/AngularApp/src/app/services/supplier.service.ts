import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Supplier } from '../classes/Supplier';
import { BASEURL } from './baseUrl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

 

  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(BASEURL.baseUrl + 'Supplier');
  }

  get(id): Observable<Supplier> {
    return this.http.get<Supplier>(BASEURL.baseUrl + 'Supplier/' + id).pipe(catchError(this.handleError));
  }

  create(data): Observable<Supplier> {
    return this.http.post<Supplier>(BASEURL.baseUrl + 'Supplier', data).pipe(catchError(this.handleError));
  }

  update(id, data): Observable<Supplier> {
    return this.http.put<Supplier>(BASEURL.baseUrl + 'Supplier/' + id, data).pipe(catchError(this.handleError));
  }

  delete(id): Observable<Supplier> {
    return this.http.delete<Supplier>(BASEURL.baseUrl + 'Supplier/' + id).pipe(catchError(this.handleError));
  }
}
