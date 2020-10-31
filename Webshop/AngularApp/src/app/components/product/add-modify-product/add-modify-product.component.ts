import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'util';
import { Product } from '../../../classes/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-modify-product',
  templateUrl: './add-modify-product.component.html',
  styleUrls: ['./add-modify-product.component.css']
})
export class AddModifyProductComponent implements OnInit {

  constructor(private service: ProductService, private router: Router) { } 

  item: Product;


  @Input() prod: Product;
  product_Name: string;
  price: number;
  productID: number;
  product_Description: string;
  shipping_Price: number;
  categoryId: number;
  supplierId: number;
  reviewsID: number[];

  ngOnInit(): void {
    try {
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
     // console.log(this.item.product_Name);
      localStorage.removeItem('item');
    } catch (err) {
      this.item = null;
    }
  }

  addProduct() {
    let val: Product;
    val = {
      product_Name: this.product_Name, price: this.price,
      productID: this.productID, product_Description: this.product_Description,
      shipping_Price: this.shipping_Price, categoryId: this.categoryId,
      supplierId: this.supplierId, reviewsID: this.reviewsID
    };
    this.service.create(val).subscribe(res => { this.router.navigate(['/product']); });
  }

  updateProduct() {
    let data: Product;
    data = {
      product_Name: this.product_Name, price: this.price,
      productID: this.item.productID, product_Description: this.product_Description,
      shipping_Price: this.shipping_Price, categoryId: this.categoryId,
      supplierId: this.supplierId, reviewsID: this.reviewsID
    };
    this.service.update(data.productID, data).subscribe(res => { this.router.navigate(['/product']); });
   
  }

}
