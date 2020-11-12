import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../classes/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-modify-user',
  templateUrl: './add-modify-user.component.html',
  styleUrls: ['./add-modify-user.component.css']
})
export class AddModifyUserComponent implements OnInit {

  constructor(public service: UserService, private router: Router) { }
  avatarImageRoute: string = this.service.avatarImageRoute;
  item: User;

  @Input() user: User;
  id: string;
  username: string;
  email: string;
  password: string;

  swap_enabled_username: boolean;
  swap_enabled_email: boolean;

  ngOnInit(): void {
    console.log("image route: " + this.avatarImageRoute);
    try {
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
      // console.log(this.item.product_Name);
      localStorage.removeItem('item');
    } catch (err) {
      this.item = null;
    }
    this.swap_enabled_username = true;
    this.swap_enabled_email = true;
  }

  addUser() {
    let val: User;
    val = { id: this.id, username: this.username, email: this.email, password: this.password };
    this.service.create(val).subscribe(res => { this.router.navigate(['/user']); });
  }

  updateUser() {
    let data: User;
    data = { id: this.item.id, username: this.username, email: this.email, password: this.password };
    this.service.update(data.id, data).subscribe(res => { this.router.navigate(['/user']); });
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

  cancel() {
    this.router.navigate(['/user']);
  }

  swapToValueFromPlaceHolder_username() {
    if (this.swap_enabled_username) {
      this.username = this.item.username;
      this.swap_enabled_username = !this.swap_enabled_username;
    }
  }
  swapToValueFromPlaceHolder_email() {
    if (this.swap_enabled_email) {
      this.email = this.item.email;
      this.swap_enabled_email = !this.swap_enabled_email;
    }
  }
}
