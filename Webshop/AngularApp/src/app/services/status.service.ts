import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASEURL } from './baseUrl';
import { Status } from '../classes/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusService { 
  constructor(private http: HttpClient) {
  }
  get(id: number): Observable<Status> {
    return this.http.get<Status>(BASEURL.baseUrl + 'Status/' + id);
  }
  getAll(): Observable<Status[]> {
    return this.http.get<Status[]>(BASEURL.baseUrl + 'Status/');
  }
}
