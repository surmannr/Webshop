import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../classes/Order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private service: OrderService, private router: Router) { }

  OrderList: Order[] = [];


  ngOnInit(): void {
    this.refreshOrderList();
  }
  refreshOrderList() {
    this.service.getAll().subscribe(data => {
      this.OrderList = data;
    });
  }


  editClick(item: Order) {
    localStorage.setItem('item', JSON.stringify(item));
    this.router.navigate(['/order/add']);
  }

  deleteClick(item: Order) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.orderId).subscribe(_ => {
        this.refreshOrderList();
      });
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  addOrder() {
    this.router.navigate(['/order/add']);
  }


  ProductsClick(item: Order) {
    localStorage.setItem('item', JSON.stringify(item));
    this.router.navigate(['/order/orderitems']);
  }
}
