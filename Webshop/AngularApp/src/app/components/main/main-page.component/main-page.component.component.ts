import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'console';
import { empty } from 'rxjs';
import { concat } from 'rxjs/operators';
import { Category } from '../../../classes/Category';
import { Product } from '../../../classes/Product';
import { Review } from '../../../classes/Review';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-main-page.component',
  templateUrl: './main-page.component.component.html',
  styleUrls: ['./webshopstyle.css']
 
})
export class MainPage implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router, private productService: ProductService,
              private reviewService: ReviewService) { }

    CategoryList: Category[] = [];
    ProductList: Product[] = [];

  isLoggedIn: boolean = true;
 

  CategoryImageNameList: string[] = [];
  ProductImageNameList: string[] = [];
  

  imageRoute: string = "https://localhost:44308/Resources/Images/";

  ngOnInit(): void {
    this.refreshCategoryList();
    this.refreshProductList();
    let json_token = localStorage.getItem('token');
    if (json_token == null) {
      this.isLoggedIn = false;
    }
  }

  refreshReviewList(product: Product) {   
    let ReviewList: Review[] = [];
    let counter: number;
    let sum: number;

   
      counter = 0;
      sum = 0;


      this.reviewService.get(product.productID).subscribe(data => {

        ReviewList = data;

        if (ReviewList.length === 0) {
          product.stars = 0         
        }
        else {

          for (let review of ReviewList) {
            counter = counter + 1;
            sum = sum + review.stars;
          };
          let avg = Math.ceil(sum / counter);
          product.stars = avg;      
        }       
      });      
    
    
  }
         



  refreshProductList() {
    this.productService.getAll().subscribe(data => {
      this.ProductList = data;
      for (let product of this.ProductList) {
        this.ProductImageNameList.push(this.imageRoute + product.imageName);
        this.refreshReviewList(product);
      };
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

  
  categorySelector(categoryId: number) {
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products');
   
  }

  categoryPictureClicked(str: string) {
    let index = str;
    let categoryId = this.CategoryList[index].categoryId;    
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products');
  }
  checkLogin() {
    if (!this.isLoggedIn)
      this.router.navigateByUrl('/login');
  }



  onLogout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
