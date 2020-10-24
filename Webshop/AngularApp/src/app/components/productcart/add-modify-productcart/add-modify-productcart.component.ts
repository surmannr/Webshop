import { Component, Input, OnInit } from '@angular/core';
import { ProductcartService } from '../../../services/productcart.service';

@Component({
  selector: 'app-add-modify-productcart',
  templateUrl: './add-modify-productcart.component.html',
  styleUrls: ['./add-modify-productcart.component.css']
})
export class AddModifyProductcartComponent implements OnInit {

  constructor(private service: ProductcartService) { }

  @Input() pcart: any;
  productCartId: number;
  productId: number;
  cartId: number;

  ngOnInit(): void {
    this.productCartId = this.pcart.productCartId;
    this.productId = this.pcart.productId;
    this.cartId = this.pcart.cartId;
  }
  addProductCart() {
    var val = { productCartId: this.productCartId, productId: this.productId, cartId: this.cartId };
    this.service.create(val).subscribe(res => { alert("Added the productcart"); });
  }

  updateProductCart() {
    var val = { productCartId: this.productCartId, productId: this.productId, cartId: this.cartId };
    this.service.update(this.productCartId, val).subscribe(res => { alert("Updated the productcart"); });
  }
}
