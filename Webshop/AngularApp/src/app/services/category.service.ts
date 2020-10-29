import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../classes/Category';
import { BASEURL } from './baseUrl';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly baseUrl = 'https://localhost:44308/api/Category';
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(BASEURL.baseUrl + 'Category');
  }

  get(id): Observable<Category> {
    return this.http.get<Category>(BASEURL.baseUrl + 'Category/' + id);
  }

  create(data): Observable<Category> {
    return this.http.post<Category>(BASEURL.baseUrl + 'Category', data);
  }

  update(id, data): Observable<Category> {
    return this.http.put<Category>(BASEURL.baseUrl + 'Category/' + id, data);
  }

  delete(id): Observable<Category> {
    return this.http.delete<Category>(BASEURL.baseUrl + 'Category/' + id);
  }
}
