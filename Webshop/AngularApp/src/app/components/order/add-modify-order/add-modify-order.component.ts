import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-add-modify-order',
  templateUrl: './add-modify-order.component.html',
  styleUrls: ['./add-modify-order.component.css']
})
export class AddModifyOrderComponent implements OnInit {

  constructor(private service: OrderService) { }

  @Input() order: any;
  userId: string;
  paymentMetod: string;
  shippingMethod: string;
  orderTime: string;
  statusName: string;
  kiVette: string;
  orderId: number;
  orderItemsID: number[];

  ngOnInit(): void {
    this.userId = this.order.userId;
    this.paymentMetod = this.order.paymentMetod;
    this.shippingMethod = this.order.shippingMethod;
    this.orderTime = this.order.orderTime;
    this.statusName = this.order.statusName;
    this.kiVette = this.order.kiVette;
    this.orderId = this.order.orderId;
    this.orderItemsID = this.order.orderItemsID;
  }

  addOrder() {
    var val = {
      userId: this.userId, paymentMetod: this.paymentMetod, shippingMethod: this.shippingMethod, orderTime: this.orderTime, statusName: this.statusName,
      kiVette: this.kiVette, orderId: this.orderId, orderItemsID: this.orderItemsID};
    this.service.create(val).subscribe(res => { alert("Added the Order"); });
  }

  updateOrder() {
    var val = {
      userId: this.userId, paymentMetod: this.paymentMetod, shippingMethod: this.shippingMethod, orderTime: this.orderTime, statusName: this.statusName,
      kiVette: this.kiVette, orderId: this.orderId, orderItemsID: this.orderItemsID
    };
    this.service.update(this.orderId, val).subscribe(res => { alert("Updated the Order"); });
  }
}
