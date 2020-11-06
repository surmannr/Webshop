import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../classes/Category';
import { Product } from '../../../classes/Product';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-main-page.component',
  templateUrl: './main-page.component.component.html',
  styleUrls: ['./webshopstyle.css']
 
})
export class MainPage implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router, private productService: ProductService) { }

  CategoryList: Category[] = [];
  ProductList: Product[] = [];
  CategoryImageNameList: string[] = [];
  ProductImageNameList: string[] = [];

  imageRoute: string = "https://localhost:44308/Resources/Images/";

  ngOnInit(): void {
    this.refreshCategoryList();
    this.refreshProductList();
  }
  refreshProductList() {
    this.productService.getAll().subscribe(data => {
      this.ProductList = data;
      for (let product of this.ProductList) {
        this.ProductImageNameList.push(this.imageRoute + product.imageName);
        console.log("teszt: " + product.product_Description);
      }
    });
  }



  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;
      for (let category of this.CategoryList) {
        this.CategoryImageNameList.push(this.imageRoute + category.imageName);
      };
    });
  }

  


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
