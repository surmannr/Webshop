import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  avatarImageRoute: string = this.service.avatarImageRoute;


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
      this.toastr.success('Have a nice day', 'Welcome to our webshop');
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/');
    }, err => {
        if (err.status == 400) {
          this.toastr.error('Incorrect username or password', 'Authentication failed');         
        }
        else {
          console.log(err);
        }
    });
  }
}
