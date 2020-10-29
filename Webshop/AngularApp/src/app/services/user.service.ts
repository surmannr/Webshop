import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/User';
import { BASEURL } from './baseUrl';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

 

  constructor(private http: HttpClient, private fb: FormBuilder) {
  }

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












  getAll(): Observable<User[]> {
    return this.http.get<User[]>(BASEURL.baseUrl + 'User');
  }

  get(id): Observable<User> {
    return this.http.get<User>(BASEURL.baseUrl + 'User/' + id);
  }

  create(data): Observable<User> {
    return this.http.post<User>(BASEURL.baseUrl + 'User', data);
  }

  update(id, data): Observable<User> {
    return this.http.put<User>(BASEURL.baseUrl+ 'User/' + id, data);
  }

  delete(id): Observable<User> {
    return this.http.delete<User>(BASEURL.baseUrl+ 'User/' + id);
  }
}
