import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../classes/Order';
import { User } from '../../../classes/User';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-modify-order',
  templateUrl: './add-modify-order.component.html',
  styleUrls: ['./add-modify-order.component.css']
})
export class AddModifyOrderComponent implements OnInit {

  item: Order;

  UserList: User[] = [];

  constructor(private service: OrderService, private router: Router, private userService: UserService) { }

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

  ngOnInit(): void {
    this.refreshUserList();
    try {
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
       //console.log(this.item);
      localStorage.removeItem('item');
    } catch (err) {
      this.item = null;
    }
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
    this.service.create(val).subscribe(res => { this.router.navigate(['/order']); });
  }

  updateOrder() {
    let val: Order; 
    val = {
      userId: this.userName, paymentMetod: this.paymentMetod, shippingMethod: this.shippingMethod, orderTime: this.orderTime, statusName: this.statusName,
      kiVette: this.item.kiVette, orderId: this.item.orderId, orderItemsID: this.orderItemsID
    };
    this.service.update(val.orderId, val).subscribe(res => { this.router.navigate(['/order']); });
  }
}
