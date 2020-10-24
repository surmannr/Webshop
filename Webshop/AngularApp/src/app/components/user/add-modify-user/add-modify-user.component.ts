import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-modify-user',
  templateUrl: './add-modify-user.component.html',
  styleUrls: ['./add-modify-user.component.css']
})
export class AddModifyUserComponent implements OnInit {

  constructor(private service: UserService) { }


  @Input() user: any;
  id: string;
  username: string;
  email: string;
  password: string;

  ngOnInit(): void {
    this.id = this.user.id;
    this.username = this.user.username;
    this.email = this.user.email;
    this.password = this.user.password;
  }

  addUser() {
    var val = { id: this.id, username: this.username, email: this.email, password: this.password  };
    this.service.create(val).subscribe(res => { alert("Added the user"); });
  }

  updateUser() {
    var data = { id: this.id, username: this.username, email: this.email, password: this.password };
    this.service.update(this.id, data).subscribe(res => { alert("Updated the user"); });
  }

}
