import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { AppComponent } from '../../app.component';
import { Product } from '../../classes/Product';
import { UsersFavouriteProducts } from '../../classes/UsersFavouriteProducts';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/review.service';
import { UserFavouriteProductsService } from '../../services/user-favourite-products.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-main-favourites',
  templateUrl: './main-favourites.component.html',
  styleUrls: ['./main-favourites.component.css']
})
export class MainFavouritesComponent extends AppComponent implements OnInit {


  @Input()
  selectedOption_category: string;
  inputFieldName: string;

  constructor(private categoryService: CategoryService, private userFavouriteProducts: UserFavouriteProductsService, private productService: ProductService,
    private reviewService: ReviewService, private router: Router, private userFavouriteProductService: UserFavouriteProductsService) { super(); }





  ProductImageNameList: string[] = [];
  ProductNameList: string[] = [];
  ProductIdList: number[] = [];
  UserFavouriteProductIdList: number[] = [];

  ngOnInit(): void {    
    localStorage.removeItem('product');    
    this.selectedOption_category = JSON.parse(JSON.stringify(-1));
    this.refreshCategoryList();
    this.refreshProductList();
    this.isLoggedIn = super.tokenCheck(this.isLoggedIn);
  }


  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;
    });
  }

  refreshProductList() {

    this.userFavouriteProducts.Get().subscribe(data => {      
      for (let res of data) {        
        this.productService.get(res.productIndex).subscribe(productData => {
          this.ProductImageNameList.push(this.imageRoute + productData.imageName);
          this.ProductNameList.push(productData.product_Name);
          this.ProductIdList.push(productData.productID);
          this.UserFavouriteProductIdList.push(res.id);
        });
      }
      
    });    
       
  }



  productPictureClicked(productId: number) {
    this.productService.get(productId).subscribe(data => {
      localStorage.setItem('product', JSON.stringify(data));
      this.router.navigateByUrl('techonomy/products/' + productId);
    });     
  }


  //Categóriára való szűrés navbar-ból
  categorySelector(categoryId: number) {
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
  }


  //User kiléptetés && bejelenetkezés ellenőrzés
  checkLogin() {
    super.checkLogin(this.isLoggedIn, this.router);
  }
  onLogout() {
    super.onLogout(this.router);
  }

  removeFromFavourite(index: number) { 
    this.userFavouriteProductService.Delete(index).subscribe(_ => {
     this.ngOnInit;
    });
  }
}
