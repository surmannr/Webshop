import { Component, OnInit } from '@angular/core';
import { Product } from '../../../classes/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  ProductList: Product[] = [];
  ModalTitle: string;
  ActivateAddEditProdComp: boolean = false;;
  prod: Product;

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.refreshProdList();
  }
  refreshProdList() {
    this.service.getAll().subscribe(data => {
      this.ProductList = data;
    });
    }

  addClick() {
    this.prod = {
      product_Name: "",
      price: 0,
      productID: 0,
      product_Description: "",
      shipping_Price: 0,
      categoryId: 0,
      supplierId: 0,
      reviewsID: [
        0
      ]
    }
    this.ModalTitle = "Add Product";
    this.ActivateAddEditProdComp = true;
  }

  editClick(item) {
    this.prod = item;
    this.ModalTitle = "Edit Product";
    this.ActivateAddEditProdComp = true;
  }

  closeClick() {
    this.ActivateAddEditProdComp = false;
    this.refreshProdList();
  }

  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.productID).subscribe(_ => {
        this.refreshProdList();
      });
    }
  }

}
