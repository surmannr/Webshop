import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../../classes/OrderItem';
import { OrderitemService } from '../../../services/orderitem.service';

@Component({
  selector: 'app-orderitem-list',
  templateUrl: './orderitem-list.component.html',
  styleUrls: ['./orderitem-list.component.css']
})
export class OrderitemListComponent implements OnInit {

  constructor(private service: OrderitemService) { }

  OrderItemList: OrderItem[] = []
  ModalTitle: string;
  ActivateAddEditOrderitemComp: boolean = false;
  orderitem: OrderItem;

  ngOnInit(): void {
    this.refreshOrderItemList();
  }
  refreshOrderItemList() {
    this.service.getAll().subscribe(data => {
      this.OrderItemList = data;
    });
  }

  addClick() {
    this.orderitem = {
      amount: 0,
      price: 0,
      productID: 0,
      orderId: 0,
      statusId: 0,
      orderItemId: 0
    }
    this.ModalTitle = "Add OrderItem";
    this.ActivateAddEditOrderitemComp = true;
  }

  editClick(item) {
    this.orderitem = item;
    this.ModalTitle = "Edit OrderItem";
    this.ActivateAddEditOrderitemComp = true;
  }

  closeClick() {
    this.ActivateAddEditOrderitemComp = false;
    this.refreshOrderItemList();
  }

  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.orderItemId).subscribe(_ => {
        this.refreshOrderItemList();
      });
    }
  }
}
