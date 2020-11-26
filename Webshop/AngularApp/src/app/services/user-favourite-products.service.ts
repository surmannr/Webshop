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

  /**
   * @description - A felhasználó kedvenc termékeinek lekérdezése felhasználói azonosító alapján
   * @param userId - A felhasználó azonosítója
   * @returns Observable<UserFavouriteProducts[]> - A felhasználó kedvenc termékeinek tömbje
   */
  Get(userId): Observable<UsersFavouriteProducts[]> {
    return this.http.get<UsersFavouriteProducts[]>(BASEURL.baseUrl + "UserFavouriteProducts/" + userId);
  }

  /**
   * @description - Egy új kedvenc terméket jegyez be a felhasználó
   * @param data - Tartalmazza a szükséges adatokat az új bejegyzés létrehozásához
   */
  Post(data): Observable<UsersFavouriteProducts> {
    return this.http.post<UsersFavouriteProducts>(BASEURL.baseUrl + 'UserFavouriteProducts',data);
  }

  /**
   * @description - A felhasználó kedvenc termékei közül töröl egy terméket
   * @param id - A törlendő termék azonosítója
   */
  Delete(id): Observable<UsersFavouriteProducts> {
    return this.http.delete<UsersFavouriteProducts>(BASEURL.baseUrl + 'UserFavouriteProducts/' + id);
  }
}
