import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private http: HttpClient,
    private service: ProductService, private router: Router, private categoryService: CategoryService, private supplierService: SupplierService) { } 

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

  swap_enabled_name: boolean;
  swap_enabled_price: boolean;
  swap_enabled_shippingPrice: boolean;
  swap_enabled_description: boolean;

/*----------------------------------------*/

  product_image_name: string; 

  public message: string;
  public progress: number;
  @Output() public onUpLoadFinished = new EventEmitter();

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.product_image_name = fileToUpload.name;
   // console.log(fileToUpload.name);


    this.service.uploadFile(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success';
        this.onUpLoadFinished.emit(event.body);
      }
    });;
  }

/*----------------------------------------*/

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
    this.swap_enabled_name = true;
    this.swap_enabled_price = true;
    this.swap_enabled_shippingPrice = true;
    this.swap_enabled_description = true;
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
      category_Name: this.category_Name, name: this.name,
      imageName: this.product_image_name
     
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
    data.imageName = this.product_image_name;   
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


  swapToValueFromPlaceHolder_name() {
    if (this.swap_enabled_name) {
      this.product_Name = this.item.product_Name;
      this.swap_enabled_name = !this.swap_enabled_name;
    }
    
  }
  swapToValueFromPlaceHolder_price() {
    if (this.swap_enabled_price) {
      this.price = this.item.price;
      this.swap_enabled_price = !this.swap_enabled_price;
    }
   
  }
  swapToValueFromPlaceHolder_shippingPrice() {
    if (this.swap_enabled_shippingPrice) {
      this.shipping_Price = this.item.shipping_Price;
      this.swap_enabled_shippingPrice = !this.swap_enabled_shippingPrice;
    }
   
  }
  swapToValueFromPlaceHolder_description() {
    if (this.swap_enabled_description) {
      this.product_Description = this.item.product_Description;
      this.swap_enabled_description = !this.swap_enabled_description;
    }    
  }



}
