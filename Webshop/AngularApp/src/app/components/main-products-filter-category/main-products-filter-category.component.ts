import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { Product } from '../../classes/Product';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-main-products-filter-category',
  templateUrl: './main-products-filter-category.component.html',
  styleUrls: ['./main-products-filter-category.component.css']
})
export class MainProductsFilterCategoryComponent extends AppComponent implements OnInit {

  @Input()
  selectedOption_category: string;
  inputFieldName: string;

  constructor(private categoryService: CategoryService, private productService: ProductService,
    private reviewService: ReviewService, private router: Router, private toastr: ToastrService) { super(); }


 


  ProductImageNameList: string[] = [];

  ngOnInit(): void {
    this.refreshCategoryList();


    var categoryId_json = localStorage.getItem('categoryId');

    if (categoryId_json == null) {
      this.selectedOption_category = JSON.parse(JSON.stringify(-1));
     
    }
    else {     
      
      this.selectedOption_category = JSON.parse(categoryId_json);
     
      this.refreshProductList(JSON.parse(categoryId_json));
      this.selectedOption_category = JSON.parse(categoryId_json);
    }
    this.isLoggedIn = super.tokenCheck(this.isLoggedIn);
  }


  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;
    });
  }

  refreshReviewList(product: Product) {
    let counter: number = 0;
    let sum: number = 0;
    this.reviewService.get(product.productID).subscribe(reviews => {
      if (reviews.length === 0) {
        product.stars = 0;
        product.starsList = [];
        product.emptyStarsList = [];
        for (let i: number = 0; i < 5; i++) {
          product.emptyStarsList.push(new Object());
        }
      }
      else {
        for (let review of reviews) {
          counter = counter + 1;
          sum = sum + review.stars;
        };
        let avg = Math.ceil(sum / counter);
        product.stars = avg;
        product.starsList = [];
        product.emptyStarsList = [];
        for (let i: number = 0; i < avg; i++) {
          product.starsList.push(new Object());
        }
        for (let i: number = 0; i < 5 - avg; i++) {
          product.emptyStarsList.push(new Object());
        }   
      }
    }, (error) => {
      this.toastr.error(error.error, "Error");
    });
  }

  refreshProductList(categoryId: number) {
    this.productService.GetProductsByCategoryId(categoryId).subscribe(data => {
      this.selectedOption_category = categoryId.toString();
      this.ProductList = data;
      for (let product of this.ProductList) {       
        this.ProductImageNameList.push(this.imageRoute + product.imageName);
        this.refreshReviewList(product);
      };      
    });   
  }


  removeFilterFromProducts() {
    this.router.navigateByUrl("/techonomy/products/category/nofilter");
  }

  nameFilter(name: string) {

    if (name.length > 1) {

      if (typeof this.selectedOption_category !== 'undefined') {
        if (JSON.parse(this.selectedOption_category) !== -1) {

          //Filter by using the name and the category of the product
          this.filterByNameAndCategory(name, JSON.parse(this.selectedOption_category));
        }

        //There is a name for the filter and we dont want to filter by category
        else this.filterByName(name);
      }

      // There is no category selected, but there is a name for the filter
      else this.filterByName(name);
    }

    else if (typeof this.selectedOption_category !== 'undefined') {
      if (JSON.parse(this.selectedOption_category) !== -1) {
        //Remove the previous filter
        this.removeFilterFromProducts();

        //There is no name in the name filter field but there is a valid category selected
        this.filterByCategory(JSON.parse(this.selectedOption_category));
      }
      else this.removeFilterFromProducts();
    }

    // The name for the filtering is empty and there is no category selected so remove the filtering property from the products
    else this.removeFilterFromProducts();
  }

  filterClicked() {
  
    //Remove the previous filter form the products
    this.removeFilterFromProducts();


    if (typeof this.inputFieldName !== 'undefined') {
      if (this.inputFieldName.length > 1) {
        //Had to use theese 2 conditions cause the empty input field is not undifined nor ""


        if (this.selectedOption_category !== 'undefined' && JSON.parse(this.selectedOption_category) !== -1) {

          //There is a valid category selected and there is a name for filtering too
          this.filterByNameAndCategory(this.inputFieldName, JSON.parse(this.selectedOption_category));
        }

        //There is no valid category selected for filtering but there is a name
        else this.filterByName(this.inputFieldName);

      }
      else {
        //There is no name for the filter

        if (this.selectedOption_category !== 'undefined') {
          if (JSON.parse(this.selectedOption_category) !== -1) {

            //There is a valid category for the filter
            this.filterByCategory(JSON.parse(this.selectedOption_category));
          }

          //The category filter's value is none and there is no name for the filer so remove the filtering property from the products
          else this.removeFilterFromProducts();
        }
      }
    }
    else if (this.selectedOption_category !== 'undefined') {
      //Filter by only using the category

      if (JSON.parse(this.selectedOption_category) !== -1) {

        //There is a valid category selected for filtering
        this.filterByCategory(JSON.parse(this.selectedOption_category));
      }

      //There is no valid category selected for filtering
      else this.removeFilterFromProducts();
    }
    
  }

  filterByName(productName: string) {
    localStorage.setItem('productName', JSON.stringify(productName));
    this.router.navigateByUrl('techonomy/products/category/productnameFilter/' + productName);
  }


  filterByCategory(categoryId: number) {   
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
    this.ProductImageNameList = [];
    this.ngOnInit();
  }


  filterByNameAndCategory(productName: string, categoryId: number) {
    localStorage.setItem('productName', JSON.stringify(productName));
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products/category/mixedFilter/categoryId/' + categoryId + "/productName/" + productName);
  }

 
  productPictureClicked(product: Product) {
    localStorage.setItem('product', JSON.stringify(product));
    this.router.navigateByUrl('techonomy/products/' + product.productID);
  }

  //Categóriára való szűrés navbar-ból
  categorySelector(categoryId: number) {
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
    this.ProductImageNameList = [];
    this.ngOnInit();    
  }


  //User kiléptetés && bejelenetkezés ellenőrzés
  checkLogin() {
    super.checkLogin(this.isLoggedIn, this.router);
  }
  onLogout() {
    super.onLogout(this.router);
  }
}
