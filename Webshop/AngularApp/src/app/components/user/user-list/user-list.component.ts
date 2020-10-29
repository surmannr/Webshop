import { Component, OnInit } from '@angular/core';
import { User } from '../../../classes/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  UserList: User[] = [];
  ModalTitle: string;
  ActivateAddEditUserComp: boolean = false;;
  user: User;

  constructor(readonly service: UserService) { }

  ngOnInit(): void {
    this.refreshUserList();
  }
  refreshUserList() {
    this.service.getAll().subscribe(data => {
      this.UserList = data;
    });
    }

  addClick() {
    this.user = {
      id: "",
      username: "",
      email: "",
      password: ""
    }
    this.ModalTitle = "Add User";
    this.ActivateAddEditUserComp = true;
  }

  editClick(item) {
    this.user = item;
    this.ModalTitle = "Edit User";
    this.ActivateAddEditUserComp = true;
  }

  closeClick() {
    this.ActivateAddEditUserComp = false;
    this.refreshUserList();
  }

  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.id).subscribe(_ => {
        this.refreshUserList();
      });
    }
  }

}
