import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../classes/Order';
import { OrderItem } from '../../../classes/OrderItem';
import { OrderitemService } from '../../../services/orderitem.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-orderitem-list',
  templateUrl: './orderitem-list.component.html'

})
export class OrderitemListComponent implements OnInit {

  constructor(private service: OrderitemService, private router: Router, private userService: UserService) { }
  item: Order;
  userDetails;

  OrderItemList: OrderItem[] = []
  ModalTitle: string;
  ActivateAddEditOrderitemComp: boolean = false;
  orderitem: OrderItem;

  ngOnInit(): void {

    try {
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
      console.log(this.userDetails);
    } catch (err) { console.log(err); }
    this.refreshOrderItemList();
  }
  refreshOrderItemList() {
    this.service.getAll().subscribe(data => {
      this.OrderItemList = data;
    });
  }

  editClick(item) {
    localStorage.setItem('orderItem', JSON.stringify(item));
    this.router.navigate(['/order/orderitems/add']);
  }


  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.orderItemId).subscribe(_ => {
        this.refreshOrderItemList();
      });
    }
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  addOrderItem() {
    this.router.navigate(['/order/orderitems/add']);
  }
  goBack() {
    localStorage.removeItem('item');
    this.router.navigate(['/order']);
  }
}
