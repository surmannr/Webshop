import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Review } from '../classes/Review';
import { BASEURL } from './baseUrl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

 

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(BASEURL.baseUrl + 'Review');
  }

  get(id): Observable<Review[]> {
    return this.http.get<Review[]>(BASEURL.baseUrl + 'Review/' + id).pipe(catchError(this.handleError));
  }

  create(data): Observable<Review> {
    return this.http.post<Review>(BASEURL.baseUrl + 'Review', data).pipe(catchError(this.handleError));
  }

  update(id, data): Observable<Review> {
    return this.http.put<Review>(BASEURL.baseUrl + 'Review/' + id, data).pipe(catchError(this.handleError));
  }

  delete(id): Observable<Review> {
    return this.http.delete<Review>(BASEURL.baseUrl + 'Review/' + id).pipe(catchError(this.handleError));
  }
}
