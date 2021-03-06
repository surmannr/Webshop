import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { Global_Functions } from '../../classes/file';
import { Product } from '../../classes/Product';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrls: ['./webshopstyle.css']
})
export class MainProductsComponent extends AppComponent implements OnInit {

  @Input()
  selectedOption_category: string;
  inputFieldName: string;

  constructor(private categoryService: CategoryService, private productService: ProductService,
    private reviewService: ReviewService, private router: Router, private toastr: ToastrService) { super(); }


   

  
  ProductImageNameList: string[] = [];

  ngOnInit(): void {
    localStorage.removeItem('categoryId');
    localStorage.removeItem('productName');
    this.selectedOption_category = JSON.parse(JSON.stringify(-1));
    this.refreshCategoryList();
    this.refreshProductList();
    this.isLoggedIn = super.tokenCheck();
  }


  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;
    });
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
      let json_categoryId: string = localStorage.getItem('categoryId');
      if (json_categoryId !== null) {
        this.filterByCategory(JSON.parse(json_categoryId));
        localStorage.removeItem('categoryId');
      }     
    });
  }


  removeFilterFromProducts() {
    this.router.navigateByUrl("/techonomy/products/category/nofilter");
  }



  filterClicked() {

    //Remove the previous filter form the products
    this.removeFilterFromProducts();

    let teszt = new Global_Functions();
   
    switch (teszt.filterClicked(this.inputFieldName, this.selectedOption_category)) {
      case "filterByName": {
        this.filterByName(this.inputFieldName);
        break;
      }
      case "filterByCategory": {
        this.filterByCategory(JSON.parse(this.selectedOption_category));
        break;
      }
      case "filterByNameAndCategory": {
        this.filterByNameAndCategory(this.inputFieldName, JSON.parse(this.selectedOption_category));
        break;
      }
      default: {
        this.removeFilterFromProducts();
      }
    }
  }

  filterByName(productName: string) {
    localStorage.setItem('productName', JSON.stringify(productName));
    this.router.navigateByUrl('techonomy/products/category/productnameFilter/' + productName);
  }


  filterByCategory(categoryId: number) {    
       localStorage.setItem('categoryId', JSON.stringify(categoryId));
       this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
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
    this.removeFilterFromProducts();
    this.filterByCategory(categoryId);
  }


  //User kiléptetés && bejelenetkezés ellenőrzés
  checkLogin() {
    super.checkLogin(this.isLoggedIn, this.router);
  }
  onLogout() {
    super.onLogout(this.router);
  }
}
