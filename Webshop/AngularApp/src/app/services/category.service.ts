import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../classes/Category';
import { BASEURL } from '../services/BaseUrl';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {  
  constructor(private http: HttpClient) {
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  uploadFile(formData): Observable<any> {
    return this.http.post<any>(BASEURL.baseUrl + 'Upload', formData, { reportProgress: true, observe: 'events' }).pipe(catchError(this.handleError));
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(BASEURL.baseUrl + 'Category');
  }

  get(id): Observable<Category> {
    return this.http.get<Category>(BASEURL.baseUrl + 'Category/' + id).pipe(catchError(this.handleError));
  }

  create(data): Observable<Category> {
    return this.http.post<Category>(BASEURL.baseUrl + 'Category', data).pipe(catchError(this.handleError));
  }

  update(id, data): Observable<Category> {
    return this.http.put<Category>(BASEURL.baseUrl + 'Category/' + id, data).pipe(catchError(this.handleError));
  }

  delete(id): Observable<Category> {
    return this.http.delete<Category>(BASEURL.baseUrl + 'Category/' + id).pipe(catchError(this.handleError));
  }
}
