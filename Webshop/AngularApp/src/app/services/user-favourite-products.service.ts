import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersFavouriteProducts } from '../classes/UsersFavouriteProducts';
import { BASEURL } from '../services/BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class UserFavouriteProductsService {

  constructor(private http: HttpClient) { }

  Get(userId): Observable<UsersFavouriteProducts[]> {
    return this.http.get<UsersFavouriteProducts[]>(BASEURL.baseUrl + "UserFavouriteProducts/" + userId);
  }
  Post(data): Observable<UsersFavouriteProducts> {
    return this.http.post<UsersFavouriteProducts>(BASEURL.baseUrl + 'UserFavouriteProducts',data);
  }
  Delete(id): Observable<UsersFavouriteProducts> {
    return this.http.delete<UsersFavouriteProducts>(BASEURL.baseUrl + 'UserFavouriteProducts/' + id);
  }
}
