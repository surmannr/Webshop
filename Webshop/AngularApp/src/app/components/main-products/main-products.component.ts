import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../classes/Category';
import { Product } from '../../classes/Product';
import { Review } from '../../classes/Review';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrls: ['./webshopstyle.css']
})
export class MainProductsComponent implements OnInit {

  @Input()
  selectedOption_category: string;
  inputFieldName: string;

  constructor(private categoryService: CategoryService, private router: Router, private productService: ProductService,
    private reviewService: ReviewService) { }


  CategoryList: Category[] = [];
  ProductList: Product[] = [];
  isLoggedIn: boolean = true;
  
  ProductImageNameList: string[] = [];

  imageRoute: string = "https://localhost:44308/Resources/Images/";

  ngOnInit(): void {
    this.refreshCategoryList();
    
    let json_categoryId: string = localStorage.getItem('categoryId');
    console.log(json_categoryId);
    if (json_categoryId !== null) {
      this.filterViaCategory(JSON.parse(json_categoryId));
    }
    else {
      this.refreshProductList();
    }
  
    localStorage.removeItem('categoryId');
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
        product.hidden = false;
        this.ProductImageNameList.push(this.imageRoute + product.imageName);
        this.refreshReviewList(product);
      };
     
    });
  }
  nameFilter(name: string) {
    
    if (name.length > 1) {
      if (typeof this.selectedOption_category !== 'undefined') {
        if (JSON.parse(this.selectedOption_category) !== -1) {
          this.filterViaNameAndCategory(name, JSON.parse(this.selectedOption_category));
        }
        else {
          this.filterViaName(name);
        }
      }
      else {
        this.filterViaName(name);
      }
    }
    else this.refreshProductList();

  }

  filterClicked() {
    if (typeof this.inputFieldName !== 'undefined') {
      if (this.inputFieldName.length > 1) {
        if (this.selectedOption_category !== 'undefined' && JSON.parse(this.selectedOption_category) !== -1) {
          this.filterViaNameAndCategory(this.inputFieldName, JSON.parse(this.selectedOption_category));
        }
        else {
          this.filterViaName(this.inputFieldName);
        }
      }
      else {
        if (this.selectedOption_category !== 'undefined') {
          if (JSON.parse(this.selectedOption_category) !== -1) {
            this.filterViaCategory(JSON.parse(this.selectedOption_category));
          }
          else {
            this.refreshProductList();
          }
        }
      }
    }
    else if (this.selectedOption_category !== 'undefined') {
      if (JSON.parse(this.selectedOption_category) !== -1) {
        this.filterViaCategory(JSON.parse(this.selectedOption_category));
      }
      else {
        this.refreshProductList();
      }
    }
 
    
  }

  filterViaName(productName: string) {
   
    this.productService.getAll().subscribe(data => {
      this.ProductList = data;         
      for (let product of this.ProductList) {
        if (!product.product_Name.includes(productName)) {
          product.hidden = true;
        }
        this.ProductImageNameList.push(this.imageRoute + product.imageName);
        this.refreshReviewList(product);   
      };
      
    });
  }


  filterViaCategory(categoryId: number) {
    this.productService.getAll().subscribe(data => {
      this.ProductList = data;
      for (let product of this.ProductList) {
        if (product.categoryId !== categoryId) {
          product.hidden = true;
        }
        this.ProductImageNameList.push(this.imageRoute + product.imageName);
        this.refreshReviewList(product);
      };

    });
  }


  filterViaNameAndCategory(productName: string, categoryId: number) {    
    this.productService.getAll().subscribe(data => {
      this.ProductList = data;
      for (let product of this.ProductList) {
        if (product.categoryId !== categoryId || product.product_Name !== productName) {
          product.hidden = true;
        }
        this.ProductImageNameList.push(this.imageRoute + product.imageName);
        this.refreshReviewList(product);
      };

    });
  }
  categorySelector(categoryId: number) {
    this.filterViaCategory(categoryId);
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
