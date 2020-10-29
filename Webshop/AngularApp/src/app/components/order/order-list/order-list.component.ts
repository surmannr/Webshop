import { Component, OnInit } from '@angular/core';
import { Order } from '../../../classes/Order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private service: OrderService) { }

  OrderList: Order[] = [];
  ModalTitle: string;
  ActivateAddEditOrderComp: boolean = false;
  order: Order;

  ngOnInit(): void {
    this.refreshOrderList();
  }
  refreshOrderList() {
    this.service.getAll().subscribe(data => {
      this.OrderList = data;
    });
  }
  addClick() {
    this.order = {
      userId: "",
      paymentMetod: "",
      shippingMethod: "",
      orderTime: "",
      statusName: "",
      kiVette: "",
      orderId: 0,
      orderItemsID: [0]
    }
    this.ModalTitle = "Add Order";
    this.ActivateAddEditOrderComp = true;
  }

  editClick(item) {
    this.order = item;
    this.ModalTitle = "Edit Order";
    this.ActivateAddEditOrderComp = true;
  }

  closeClick() {
    this.ActivateAddEditOrderComp = false;
    this.refreshOrderList();
  }

  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.orderId).subscribe(_ => {
        this.refreshOrderList();
      });
    }
  }

}
