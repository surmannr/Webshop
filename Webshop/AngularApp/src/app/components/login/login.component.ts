import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { }

  formModel = {
    Username: '',
    Password: ''
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['home']);
    }
  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/home');
    }, err => {
      if (err.status == 400) {
        console.log(err);
      }
    });
  }
}
