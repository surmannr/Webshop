import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../app.component';
import { Global_Functions } from '../../../classes/file';
import { Product } from '../../../classes/Product';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-main-page.component',
  templateUrl: './main-page.component.component.html',
  styleUrls: ['./webshopstyle.css']

})
export class MainPage extends AppComponent implements OnInit {

  constructor(private categoryService: CategoryService, private productService: ProductService,
    private reviewService: ReviewService, private router: Router, private toastr: ToastrService) { super(); }


  CategoryImageNameList: string[] = [];
  ProductImageNameList: string[] = [];
  FeaturedCategoryImageNameList: string[] = [];

  ngOnInit(): void {
    this.refreshCategoryList();
    this.refreshProductList();
    this.isLoggedIn = super.tokenCheck();
  }


  refreshReviewList(product: Product) {
    let test = new Global_Functions();
    test.refreshReviewList(product, this.reviewService, this.toastr); 
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
        if (this.FeaturedCategoryImageNameList.length < 3) {


          //Here you can set logic for the featured categories
          this.FeaturedCategoryImageNameList.push(this.imageRoute + category.imageName);
        }
      };
    });
  }

  productPictureClicked(product: Product) {
    localStorage.setItem('product', JSON.stringify(product));
    this.router.navigateByUrl('techonomy/products/' + product.productID);
  }




  //Categóriára való szűrés navbar-ból
  categorySelector(categoryId: number) {
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
  }

  //Categóriára való szűrés képre kattintás esetén
  categoryPictureClicked(str: string) {
    let index = str;
    let categoryId = this.CategoryList[index].categoryId;
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
  }


  ExploreClicked() {
    this.router.navigateByUrl("techonomy/products/category/nofilter");
  }


  //User kiléptetés && bejelenetkezés ellenőrzés
  checkLogin() {
    super.checkLogin(this.isLoggedIn, this.router);
  }

  onLogout() {
    this.isLoggedIn = false;
    super.onLogout(this.router);
  }
}
