import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../classes/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-editUserCredentials',
  templateUrl: './editUserCredentials.html',
  styleUrls: ['./editUserCredentials.css']
})
export class EditUserCredentials implements OnInit {

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }


  avatarImageRoute: string = this.service.avatarImageRoute;
  userDetails;

  @Input() user: User;
  username: string;
  email: string;
  password: string;
  swap_enabled_username: boolean;
  swap_enabled_email: boolean;


  ngOnInit(): void {

    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;       
      },
      err => {
        this.toastr.error(err, "Error");       
      });
    this.swap_enabled_username = true;
    this.swap_enabled_email = true;
  }

  updateUser() {
    let data: User;
    data = { id: this.userDetails.id, username: this.username, email: this.email, password: this.password };
    this.service.update(this.userDetails.id, data).subscribe(res => { this.router.navigateByUrl(""); }, (error) => {
      this.toastr.error(error.error, "Error");
    });
   
  }

  swapToValueFromPlaceHolder_username() {
    if (this.swap_enabled_username) {
      this.username = this.userDetails.username;
      this.swap_enabled_username = !this.swap_enabled_username;
    }
  }
  swapToValueFromPlaceHolder_email() {
    if (this.swap_enabled_email) {
      this.email = this.userDetails.email;
      this.swap_enabled_email = !this.swap_enabled_email;
    }
  }
  cancelClicked() {
    this.router.navigateByUrl("");
  }

}
