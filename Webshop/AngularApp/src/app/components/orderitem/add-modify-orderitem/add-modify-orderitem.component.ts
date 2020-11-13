import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../classes/Order';
import { OrderItem } from '../../../classes/OrderItem';
import { Status } from '../../../classes/Status';
import { OrderitemService } from '../../../services/orderitem.service';
import { StatusService } from '../../../services/status.service';

@Component({
  selector: 'app-add-modify-orderitem',
  templateUrl: './add-modify-orderitem.component.html',
  styleUrls: ['./add-modify-orderitem.component.css']
 
})
export class AddModifyOrderitemComponent implements OnInit {
  

  constructor(private service: OrderitemService, private router: Router, private statusService: StatusService) { }

  item: Order;
  orderItem: OrderItem;
  StatusList: Status[] = [];

  @Input() orderitem: OrderItem;
  amount: number;
  price: number;
  productID: number;
  orderId: number;
  statusId: number;
  orderItemId: number;
  productName: string;
  statusName: string;
  addForm: boolean = true;
  selectedOption_statusId: string;
  selectedStatus: boolean = false;

  ngOnInit(): void {  
    this.refreshStatusList();
    try {
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
    //  console.log(this.item);
      _item_json = localStorage.getItem('orderItem');
      localStorage.removeItem('orderItem');
      this.orderItem = JSON.parse(_item_json);
      _item_json = localStorage.getItem('addForm');
      this.addForm = JSON.parse(_item_json);
      localStorage.removeItem('addForm');
    //  console.log(this.orderItem);
    } catch (err) {
      this.item = null;
    }
  }
  refreshStatusList() {
    this.statusService.getAll().subscribe(data => {
      this.StatusList = data;
    });
  }

  addOrderItem() {
    
    let val: OrderItem;
    val = {
      amount: this.amount, price: this.price, productID: this.productID, orderId: this.item.orderId, statusId: this.statusId,
      orderItemId: this.orderItemId, productName: this.productName, statusName: this.statusName
    };
    this.service.create(val).subscribe(res => { this.router.navigate(['order/orderitems']); });
  }

  updateOrderItem() {
    
    let val: OrderItem;
    val = {
      amount: this.amount, price: this.price, productID: this.productID, orderId: this.item.orderId, statusId: JSON.parse(this.selectedOption_statusId),
      orderItemId: this.orderItem.orderItemId, productName: this.productName, statusName: this.statusName
    };
    this.service.update(val.orderItemId, val).subscribe(res => {
      this.router.navigate(['order/orderitems']);
    });

  }
  cancel() {
    this.router.navigate(['order/orderitems']);
  }
  selectStatus() {
    this.selectedStatus = !this.selectedStatus;
  }
}
