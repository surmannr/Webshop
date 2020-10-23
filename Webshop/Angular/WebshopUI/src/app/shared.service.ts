import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class SharedService {
  readonly APIUrl = "https://localhost:44308/api";
  

  constructor(private http: HttpClient) { }

  public sendGetRequest() {
    return this.http.get(this.APIUrl + '/Category')
  }
  addCategory(val: any) {
    return this.http.post(this.APIUrl + '/Category', val);
  }
  updateCategory(id,data: any) {
    return this.http.put(this.APIUrl + '/Category/' + id, data);
  }
  deleteCategory(val: any) {
    return this.http.delete(this.APIUrl + '/Category/'+val);
  }

}
