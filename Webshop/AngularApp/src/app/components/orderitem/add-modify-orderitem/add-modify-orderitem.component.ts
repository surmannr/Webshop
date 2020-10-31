import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../classes/Order';
import { OrderItem } from '../../../classes/OrderItem';
import { OrderitemService } from '../../../services/orderitem.service';

@Component({
  selector: 'app-add-modify-orderitem',
  templateUrl: './add-modify-orderitem.component.html'
 
})
export class AddModifyOrderitemComponent implements OnInit {

  constructor(private service: OrderitemService, private router: Router) { }

  item: Order;
  orderItem: OrderItem;

  @Input() orderitem: OrderItem;
  amount: number;
  price: number;
  productID: number;
  orderId: number;
  statusId: number;
  orderItemId: number;

  ngOnInit(): void {
    try {
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
    //  console.log(this.item);
      _item_json = localStorage.getItem('orderItem');
      localStorage.removeItem('orderItem');
      this.orderItem = JSON.parse(_item_json);
    //  console.log(this.orderItem);
    } catch (err) {
      this.item = null;
    }
  }

  addOrderItem() {
    let val: OrderItem;
    val = {
      amount: this.amount, price: this.price, productID: this.productID, orderId: this.item.orderId, statusId: this.statusId,
      orderItemId: this.orderItemId
    };
    this.service.create(val).subscribe(res => { this.router.navigate(['order/orderitems']); });
  }

  updateOrderItem() {
    let val: OrderItem;
    val = {
      amount: this.amount, price: this.price, productID: this.productID, orderId: this.item.orderId, statusId: this.statusId,
      orderItemId: this.orderItem.orderItemId
    };
    this.service.update(val.orderItemId, val).subscribe(res => { this.router.navigate(['order/orderitems']); });
  }

}
