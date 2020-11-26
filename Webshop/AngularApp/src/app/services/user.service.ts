import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../classes/User';
import { BASEURL } from '../services/BaseUrl';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

 

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
  }
 
  avatarImageRoute: string = "https://localhost:44308/Resources/Images/avatar.png";



  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Passwords: this.fb.group({
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]  
    }, { validator: this.comparePasswords })    
  })

  comparePasswords(fb: FormGroup) {
    let confirmPasswordControl = fb.get('ConfirmPassword');
    if (confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors) {
      if (fb.get('Password').value != confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true })
      }
      else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  /**
   * @description - A backend-nek elküldi a bejelentkezési adatokat
   * @param formData - A bejelentkezéshez szükséges adatokat tartalmazza
   */
  login(formData) {
    return this.http.post(BASEURL.baseUrl + "User/Login", formData).pipe(catchError(this.handleError));
  }

  /**
   *@description - A bejelentkezett felhasználói profilt kéri le a backend-től
   * */
  getUserProfile() {
    return this.http.get(BASEURL.baseUrl + "UserProfile").pipe(catchError(this.handleError));
  }


 /**
  * @description - Ellenőrzi, hogy a bejelentkezett felhasználó szerepköre megfelel-e az elvártaknak
  * @param allowedRoles - A szükséges role-ok
  */
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    //Dekódoljuk a payload-ot
    try {
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    }
    catch (err) {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    }
    var userRole = payload.role;
    //Végigmegyünk a role-okon és megnézzük megvan-e a user-nek
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  /**
  * @description - Az összes adatbázisban szereplő felhasználó lekérése
  * @returns Observable<User[]> - Az adatbázisban tárolt összes felhasználó tömbje
  */
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(BASEURL.baseUrl + 'User');
  }

  /**
   * @description - Az adatbázisban tárolt felhasználók id alapján történő lekérése
   * @param id - A felhasználó azonosítója akit le kell kérni
   * @returns Observable<User> - A backend által visszadott felhasználó
   */
  get(id): Observable<User> {
    return this.http.get<User>(BASEURL.baseUrl + 'User/' + id).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy felhasználó létrehozása
   * @param data - Tartalmazza az adatokat amik a létrehozáshoz szükségesek
   */
  create(data): Observable<User> {
    return this.http.post<User>(BASEURL.baseUrl + 'User', data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy felhasználó adatait módosítja
   * @param id - Az azonosítója a módosítandó felhasználónak
   * @param data - Tartalmazza az adatokat a módosításhoz
   */
  update(id, data): Observable<User> {
    return this.http.put<User>(BASEURL.baseUrl + 'User/' + id, data).pipe(catchError(this.handleError));
  }

  /**
   * @description - Az adatbázisból töröl egy felhasználót
   * @param id - Az azonosítója a törlendő felhasználónak
   */
  delete(id): Observable<User> {
    return this.http.delete<User>(BASEURL.baseUrl + 'User/' + id).pipe(catchError(this.handleError));
  }

  /**
   * @description - Egy admin felhasználó létrehozása
   * @param data - Tartalmazza az adatokat egy admin létrehozásához
   */
  createAdmin(data): Observable<User> {
    return this.http.post<User>(BASEURL.baseUrl + 'User/registerAdmin', data).pipe(catchError(this.handleError));
  }
}
