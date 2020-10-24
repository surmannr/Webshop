import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-modify-product',
  templateUrl: './add-modify-product.component.html',
  styleUrls: ['./add-modify-product.component.css']
})
export class AddModifyProductComponent implements OnInit {

  constructor(private service: ProductService) { }

  @Input() prod: any;
  product_Name: string;
  price: number;
  productID: number;
  product_Description: string;
  shipping_Price: number;
  categoryId: number;
  supplierId: number;
  reviewsID: number[];

  ngOnInit(): void {
    this.product_Name = this.prod.product_Name;
    this.price = this.prod.price;
    this.productID = this.prod.productID;
    this.product_Description = this.prod.product_Description;
    this.shipping_Price = this.prod.shipping_Price;
    this.categoryId = this.prod.categoryId;
    this.supplierId = this.prod.supplierId;
    this.reviewsID = this.prod.reviewsID;
  }

  addProduct() {
    var val = {
      product_Name: this.product_Name, price: this.price,
      productID: this.productID, product_Description: this.product_Description,
      shipping_Price: this.shipping_Price, categoryId: this.categoryId,
      supplierId: this.supplierId, reviewsID: this.reviewsID
    };
    this.service.create(val).subscribe(res => { alert("Added the product"); });
  }

  updateProduct() {
    var data = {
      product_Name: this.product_Name, price: this.price,
      productID: this.productID, product_Description: this.product_Description,
      shipping_Price: this.shipping_Price, categoryId: this.categoryId,
      supplierId: this.supplierId, reviewsID: this.reviewsID
    };
    this.service.update(this.productID, data).subscribe(res => { alert("Updated the product"); });
  }

}
