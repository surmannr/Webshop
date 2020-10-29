import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../classes/Cart';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  constructor(private service: CartService) { }

  CartList: Cart[] = [];
  ModalTitle: string;
  ActivateAddEditCartComp: boolean = false;
  cart: Cart;

  ngOnInit(): void {
    this.refreshCartList();
  }
  refreshCartList() {
    this.service.getAll().subscribe(data => {
      this.CartList = data;
    });
  }
  addClick() { 
    this.cart = {
      cartId: 0,
      userId: "",
      user: "",
      productsID: [0]
    }
    this.ModalTitle = "Add Cart";
    this.ActivateAddEditCartComp = true;
  }

  closeClick() {
    this.ActivateAddEditCartComp = false;
    this.refreshCartList();
  }

  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.cartId).subscribe(_ => {
        this.refreshCartList();
      });
    }
  }
}
