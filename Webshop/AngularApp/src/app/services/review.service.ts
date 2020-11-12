import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../classes/Review';
import { BASEURL } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(BASEURL.baseUrl + 'Review');
  }

  get(id): Observable<Review[]> {
    return this.http.get<Review[]>(BASEURL.baseUrl+ 'Review/' + id);
  }

  create(data): Observable<Review> {
    return this.http.post<Review>(BASEURL.baseUrl + 'Review', data);
  }

  update(id, data): Observable<Review> {
    return this.http.put<Review>(BASEURL.baseUrl+ 'Review/' + id, data);
  }

  delete(id): Observable<Review> {
    return this.http.delete<Review>(BASEURL.baseUrl+ 'Review/' + id);
  }
}
