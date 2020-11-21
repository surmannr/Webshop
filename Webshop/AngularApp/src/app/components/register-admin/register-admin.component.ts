import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Global_Functions } from '../../classes/file';
import { User } from '../../classes/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  constructor(public service: UserService, private router: Router, private toastr: ToastrService) { }
  

  @Input() user: User;
  id: string;
  username: string;
  email: string;
  password: string;
  avatarImageRoute: string = this.service.avatarImageRoute;
  global_functions: Global_Functions
  ngOnInit(): void {
    this.global_functions = new Global_Functions();
    this.id = this.global_functions.makeid(10);   
    this.username = "";
    this.email = "";
    this.password = "";
  }

  addUser() {
    let val: User;
    val = { id: this.id, username: this.username, email: this.email, password: this.password };
    this.service.createAdmin(val).subscribe(res => { this.router.navigate(['/user']); }, (error) => {
      this.toastr.error(error.error, "Error");
    });  
  }
 

  cancel() {
    this.router.navigate(['/user']);
  }
}
