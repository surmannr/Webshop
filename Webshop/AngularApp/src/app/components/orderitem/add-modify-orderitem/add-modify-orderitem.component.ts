import { Component, Input, OnInit } from '@angular/core';
import { OrderitemService } from '../../../services/orderitem.service';

@Component({
  selector: 'app-add-modify-orderitem',
  templateUrl: './add-modify-orderitem.component.html',
  styleUrls: ['./add-modify-orderitem.component.css']
})
export class AddModifyOrderitemComponent implements OnInit {

  constructor(private service: OrderitemService) { }

  @Input() orderitem: any;
  amount: number;
  price: number;
  productID: number;
  orderId: number;
  statusId: number;
  orderItemId: number;

  ngOnInit(): void {
    this.amount = this.orderitem.amount;
    this.price = this.orderitem.price;
    this.productID = this.orderitem.productID;
    this.orderId = this.orderitem.orderId;
    this.statusId = this.orderitem.statusId;
    this.orderItemId = this.orderitem.orderItemId;
  }

  addOrderItem() {
    var val = {
      amount: this.amount, price: this.price, productID: this.productID, orderId: this.orderId, statusId: this.statusId,
      orderItemId: this.orderItemId
    };
    this.service.create(val).subscribe(res => { alert("Added the OrderItem"); });
  }

  updateOrderItem() {
    var val = {
      amount: this.amount, price: this.price, productID: this.productID, orderId: this.orderId, statusId: this.statusId,
      orderItemId: this.orderItemId
    };
    this.service.update(this.orderItemId, val).subscribe(res => { alert("Updated the OrderItem"); });
  }

}
