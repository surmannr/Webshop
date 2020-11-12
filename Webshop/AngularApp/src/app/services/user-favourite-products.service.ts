import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersFavouriteProducts } from '../classes/UsersFavouriteProducts';
import { BASEURL } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class UserFavouriteProductsService {

  constructor(private http: HttpClient) { }

  Get(): Observable<UsersFavouriteProducts[]> {
    return this.http.get<UsersFavouriteProducts[]>(BASEURL.baseUrl + "UserFavouriteProducts");
  }
  Post(data): Observable<UsersFavouriteProducts> {
    return this.http.post<UsersFavouriteProducts>(BASEURL.baseUrl + 'UserFavouriteProducts',data);
  }
  Delete(id): Observable<UsersFavouriteProducts> {
    return this.http.delete<UsersFavouriteProducts>(BASEURL.baseUrl + 'UserFavouriteProducts/' + id);
  }
}
