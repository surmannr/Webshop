import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Category } from '../../classes/Category';
import { Product } from '../../classes/Product';
import { Review } from '../../classes/Review';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent  extends AppComponent implements OnInit  {

  CategoryList: Category[] = [];
  isLoggedIn: boolean = true;




 

  constructor(private categoryService: CategoryService, private productService: ProductService,
    private reviewService: ReviewService, private appComponent: AppComponent, private router: Router) { super(); }


  ngOnInit(): void {

    const model = { categoryList: this.CategoryList, categoryService: this.categoryService }
    this.refreshCategoryList();
    this.CategoryList = model.categoryList;


    let json_token = localStorage.getItem('token');
    if (json_token == null) {
      this.isLoggedIn = false;
    }
   
  }

  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;
    });
  }

  checkLogin() {
    super.checkLogin(this.isLoggedIn, this.router);
  }
  onLogout() {    
    super.onLogout(this.router);
  }


}
