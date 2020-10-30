import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../classes/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  constructor(public service: UserService, private router: Router) { }


  @Input() user: User;
  id: string;
  username: string;
  email: string;
  password: string;

  ngOnInit(): void {
    this.id = this.makeid(10);
    this.username = this.user.username;
    this.email = this.user.email;
    this.password = this.user.password;
  }

  addUser() {
    let val: User;
    val = { id: this.id, username: this.username, email: this.email, password: this.password };
    this.service.createAdmin(val).subscribe(res => { alert("Added the admin"); });
    this.router.navigate(['/login']);
  }

  updateUser() {
    let data: User;
    data = { id: this.id, username: this.username, email: this.email, password: this.password };
    this.service.update(this.id, data).subscribe(res => { alert("Updated the user"); });
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
