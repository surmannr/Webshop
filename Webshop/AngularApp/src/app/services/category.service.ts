import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../classes/Category';
import { BASEURL } from './baseUrl';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {  
  constructor(private http: HttpClient) {
  }

  uploadFile(formData): Observable<any> {
    return this.http.post<any>(BASEURL.baseUrl + 'Upload', formData, { reportProgress: true, observe: 'events' });
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
