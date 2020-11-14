import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  //styleUrls: ['./src/styles.css']
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails;

  constructor(private router: Router, private service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        this.toastr.error(err, "Error");        
      });
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user']);
  }

}
