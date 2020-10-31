import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'util';
import { Category } from '../../../classes/Category';
import { Product } from '../../../classes/Product';
import { Supplier } from '../../../classes/Supplier';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-add-modify-product',
  templateUrl: './add-modify-product.component.html',
  styleUrls: ['./add-modify-product.component.css']
})
export class AddModifyProductComponent implements OnInit {

  constructor(private service: ProductService, private router: Router, private categoryService: CategoryService, private supplierService: SupplierService) { } 

  item: Product;
  CategoryList: Category[] = [];
  SupplierList: Supplier[] = [];

  @Input() prod: Product;
  product_Name: string;
  price: number;
  productID: number;
  product_Description: string;
  shipping_Price: number;   
  reviewsID: number[] = [];
  selectedOption_category: string;
  selectedOption_supplier: string;
  selectedCategory;
  name: string; 
  supplierId: number;
  category_Name: string;
  categoryId: number;
  selected_category: boolean = false;
  selected_supplier: boolean = false;

  ngOnInit(): void {
    try {
      this.refreshCategoryList();
      this.refreshSupplierList();
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
     // console.log(this.item.product_Name);
      localStorage.removeItem('item');
    } catch (err) {
      this.item = null;
    }
  }
  refreshSupplierList() {
    this.supplierService.getAll().subscribe(data => {
      this.SupplierList = data;
    });
    }
  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;
    });
    }

  addProduct() {   
    let data: Product;
    data = {
      product_Name: this.product_Name, price: this.price,
      productID: this.productID, product_Description: this.product_Description,
      shipping_Price: this.shipping_Price, categoryId: JSON.parse(this.selectedOption_category),
      supplierId: JSON.parse(this.selectedOption_supplier), reviewsID: this.reviewsID,
      category_Name: this.category_Name, name: this.name
    };
    console.log(data);
    this.service.create(data).subscribe(res => { this.router.navigate(['/product']); });
  }

  updateProduct() {
    let data = new Product();
    data.product_Name = this.product_Name; data.price = this.price; data.productID = this.item.productID;
    data.product_Description = this.product_Description;
    if (this.selectedOption_category == null) data.categoryId = this.item.categoryId;
    else data.categoryId = JSON.parse(this.selectedOption_category);
    if (this.selectedOption_supplier == null) data.supplierId = this.item.supplierId;
    else data.supplierId = JSON.parse(this.selectedOption_supplier);
    data.reviewsID = this.reviewsID; data.category_Name = this.category_Name; data.name = this.name;
    data.shipping_Price = this.shipping_Price;
    this.service.update(data.productID, data).subscribe(res => { this.router.navigate(['/product']); });
   
  }
  cancel() {
    this.router.navigate(['/product']);
  }
  selectCategory() {
    this.selectedCategory = !this.selectedCategory;
  }
  selectSupplier() {
    this.selected_supplier = !this.selected_supplier;
  }
}
