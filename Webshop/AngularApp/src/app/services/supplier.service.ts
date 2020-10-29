import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../classes/Supplier';
import { BASEURL } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(BASEURL.baseUrl + 'Supplier');
  }

  get(id): Observable<Supplier> {
    return this.http.get<Supplier>(BASEURL.baseUrl + 'Supplier/' + id);
  }

  create(data): Observable<Supplier> {
    return this.http.post<Supplier>(BASEURL.baseUrl + 'Supplier', data);
  }

  update(id, data): Observable<Supplier> {
    return this.http.put<Supplier>(BASEURL.baseUrl+ 'Supplier/' + id, data);
  }

  delete(id): Observable<Supplier> {
    return this.http.delete<Supplier>(BASEURL.baseUrl+ 'Supplier/' + id);
  }
}
