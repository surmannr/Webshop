import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../classes/Order';
import { OrderItem } from '../../../classes/OrderItem';
import { OrderitemService } from '../../../services/orderitem.service';
import { ProductService } from '../../../services/product.service';
import { StatusService } from '../../../services/status.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-orderitem-list',
  templateUrl: './orderitem-list.component.html',
  styleUrls: ['./orderitem-list.component.css']
})
export class OrderitemListComponent implements OnInit {

  constructor(private service: OrderitemService, private router: Router, private userService: UserService,
    private productService: ProductService, private statusService: StatusService) { }
  item: Order;
  userDetails;

  OrderItemList: OrderItem[] = []
 

  ngOnInit(): void {

    try {
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
    //  console.log(this.userDetails);
    } catch (err) { console.log(err); }
    this.refreshOrderItemList();
  }
  

  refreshProduct(id: number, orderItem: OrderItem) {
    this.productService.get(id).subscribe(data => {
      orderItem.productName = data.product_Name;
    });
  }
  
  refreshStatus(id: number, orderItem: OrderItem) {
    this.statusService.get(id).subscribe(data => {
      orderItem.statusName = data.name;
    });
  }
  




  refreshOrderItemList() {
 //   console.log(this.item.orderId);
    this.service.getByOrderId(this.item.orderId).subscribe(data => {
      this.OrderItemList = data;
      for (let orderItem of this.OrderItemList) {
        this.refreshProduct(orderItem.productID, orderItem);
        this.refreshStatus(orderItem.statusId, orderItem);
      };
    });
  }

  editClick(item) {
    localStorage.setItem('orderItem', JSON.stringify(item));
    localStorage.setItem('addForm', JSON.stringify(false));
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
    localStorage.setItem('addForm', JSON.stringify(true));
    this.router.navigate(['/order/orderitems/add']);
  }
  goBack() {
    localStorage.removeItem('item');
    this.router.navigate(['/order']);
  }

}
