import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductCart } from '../../../classes/ProductCart';
import { ProductcartService } from '../../../services/productcart.service';

@Component({
  selector: 'app-add-modify-productcart',
  templateUrl: './add-modify-productcart.component.html',
  styleUrls: ['./add-modify-productcart.component.css']
})
export class AddModifyProductcartComponent implements OnInit {

  constructor(private service: ProductcartService, private toastr: ToastrService) { }

  @Input() pcart: ProductCart;
  productCartId: number;
  productId: number;
  cartId: number;

  ngOnInit(): void {
    this.productCartId = this.pcart.productCartId;
    this.productId = this.pcart.productIndex;
    this.cartId = this.pcart.cartIndex;
  }
  addProductCart() {
    let val: ProductCart;
    val = { productCartId: this.productCartId, productIndex: this.productId, cartIndex: this.cartId, price: 0, product_Name: "", quantity: 0 };
    this.service.create(val).subscribe(res => { alert("Added the productcart"); }, (error) => {
      this.toastr.error(error.error, "Error");
    });
  }

}
