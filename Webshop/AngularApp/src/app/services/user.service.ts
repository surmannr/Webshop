import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../classes/User';
import { BASEURL } from './baseUrl';
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

  login(formData) {
    return this.http.post(BASEURL.baseUrl + "User/Login", formData).pipe(catchError(this.handleError));
  }

  getUserProfile() {    
    return this.http.get(BASEURL.baseUrl + "UserProfile");
  }
  //Ellenőrizzük, hogy a role-ja megfelel-e 
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

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(BASEURL.baseUrl + 'User');
  }

  get(id): Observable<User> {
    return this.http.get<User>(BASEURL.baseUrl + 'User/' + id).pipe(catchError(this.handleError));
  }

  create(data): Observable<User> {
    return this.http.post<User>(BASEURL.baseUrl + 'User', data).pipe(catchError(this.handleError));
  }

  update(id, data): Observable<User> {
    return this.http.put<User>(BASEURL.baseUrl + 'User/' + id, data).pipe(catchError(this.handleError));
  }

  delete(id): Observable<User> {
    return this.http.delete<User>(BASEURL.baseUrl + 'User/' + id).pipe(catchError(this.handleError));
  }

  createAdmin(data): Observable<User> {
    return this.http.post<User>(BASEURL.baseUrl + 'User/registerAdmin', data).pipe(catchError(this.handleError));
  }
}
