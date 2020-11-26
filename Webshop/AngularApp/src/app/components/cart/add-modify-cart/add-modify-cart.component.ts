import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../../../classes/Cart';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-add-modify-cart',
  templateUrl: './add-modify-cart.component.html',
  styleUrls: ['./add-modify-cart.component.css']
})
export class AddModifyCartComponent implements OnInit {

  constructor(private service: CartService) { }

  @Input() cart: Cart;
  cartId: number;
  userId: string;
  user: string;
  productsID: number[];

  ngOnInit(): void {    
    this.cartId = this.cart.cartId;
    this.userId = this.cart.userId;
    this.user = this.cart.user;
    this.productsID = this.cart.productsID;
  }

  addCart() {    
    let val: Cart;
    val = { cartId: this.cartId, userId: this.userId, user: this.user, productsID: this.productsID };
    this.service.create(val).subscribe(_ => { alert("Added the cart"); });    
  }
}
