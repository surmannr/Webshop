import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../classes/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-editUserCredentials',
  templateUrl: './editUserCredentials.html',
  styleUrls: ['./editUserCredentials.css']
})
export class EditUserCredentials implements OnInit {

  constructor(private service: UserService, private router: Router) { }

  userDetails;

  @Input() user: User;
  username: string;
  email: string;
  password: string;

  ngOnInit(): void {

    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;       
      },
      err => {
        console.log(err);
      });   
  }

  updateUser() {
    let data: User;
    data = { id: this.userDetails.id, username: this.username, email: this.email, password: this.password };
    this.service.update(this.userDetails.id, data).subscribe(res => { this.router.navigate(['/home']);});
   
  }




}
