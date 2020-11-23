import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BASEURL } from '../services/BaseUrl';
import { Status } from '../classes/Status';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService { 
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  get(id: number): Observable<Status> {
    return this.http.get<Status>(BASEURL.baseUrl + 'Status/' + id).pipe(catchError(this.handleError));
  }
  getAll(): Observable<Status[]> {
    return this.http.get<Status[]>(BASEURL.baseUrl + 'Status/');
  }
}
