import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Global_Functions } from '../../classes/file';
import { User } from '../../classes/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {

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
    this.service.getAll().subscribe(res => {

      let val: User;
      val = { id: this.id, username: this.username, email: this.email, password: this.password };

      if (res.length == 0) this.service.createAdmin(val).subscribe( _ => { this.router.navigate(['/user']); }, (error) => {
        this.toastr.error(error.error, "Error");
      });

      else this.service.create(val).subscribe( _ => { this.router.navigate(['/user']); }, (error) => {
        this.toastr.error(error.error, "Error");
      });
            
    })

  }

}
