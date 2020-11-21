import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../../classes/Order';
import { Status } from '../../../classes/Status';
import { User } from '../../../classes/User';
import { OrderService } from '../../../services/order.service';
import { StatusService } from '../../../services/status.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-modify-order',
  templateUrl: './add-modify-order.component.html',
  styleUrls: ['./add-modify-order.component.css']
})
export class AddModifyOrderComponent implements OnInit {

  item: Order;

  UserList: User[] = [];
  StatusList: Status[] = [];

  constructor(private service: OrderService, private router: Router, private userService: UserService, private statusService: StatusService,
    private toastr: ToastrService) { }

  @Input() order: Order;
  userName: string;
  paymentMetod: string;
  shippingMethod: string;
  orderTime: string;
  statusName: string;
  kiVette: string;
  orderId: number;
  orderItemsID: number[];
  selectedOption: string;
  selected_user: boolean = false;
  selectedStatus: boolean = false;
  selectedOption_status: string;

  



  ngOnInit(): void {
    this.refreshUserList();
    this.refreshStatusList();
    try {
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
       
      localStorage.removeItem('item');
    } catch (err) {
      this.item = null;
    }
  }
  refreshStatusList() {
    this.statusService.getAll().subscribe(data => {
      this.StatusList = data;
    });
    }
  refreshUserList() {
    this.userService.getAll().subscribe(data => {
      this.UserList = data;     
    });
  }
  addOrder() {
  
    let val: Order;
    val = {
      userId: this.selectedOption, paymentMetod: this.paymentMetod, shippingMethod: this.shippingMethod, orderTime: this.orderTime, statusName: this.statusName,
      kiVette: this.kiVette, orderId: this.orderId, orderItemsID: this.orderItemsID
    };
    this.service.create(val).subscribe( () => { this.router.navigate(['/order']); },
      (error) => {
        this.toastr.error(error.error, "Error");
      });
  }

  updateOrder() {

    let val: Order; 
    val = {
      userId: this.userName, paymentMetod: this.paymentMetod, shippingMethod: this.shippingMethod, orderTime: this.orderTime, statusName: this.selectedOption_status,
      kiVette: this.item.kiVette, orderId: this.item.orderId, orderItemsID: this.orderItemsID
    };   
    this.service.update(val.orderId, val).subscribe( () => { this.router.navigate(['/order']); },
      (error) => {
        this.toastr.error(error.error, "Error");
      });
  }
  cancel() {
    this.router.navigate(['/order']);
  }
  selectUser() {
    this.selected_user = !this.selected_user;
  }
  selectStatus() {
    this.selectedStatus = !this.selectedStatus;
  }
}
