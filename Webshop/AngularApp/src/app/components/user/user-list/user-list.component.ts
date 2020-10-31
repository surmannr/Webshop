import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../classes/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  
  UserList: User[] = [];

  constructor(readonly service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.refreshUserList();
  }
  refreshUserList() {
    this.service.getAll().subscribe(data => {
      this.UserList = data;
    });
  }

  editClick(item: User) {
    localStorage.setItem('item', JSON.stringify(item));
    this.router.navigate(['/user/add']);
  }

  deleteClick(item: User) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.id).subscribe(_ => {
        this.refreshUserList();
      });
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  addAdmin() {
    this.router.navigate(['/adminRegister']);
  }

}
