import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { UserFavouriteProductsService } from '../../services/user-favourite-products.service';
import { UserService } from '../../services/user.service';
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
    private userService: UserService, private router: Router, private userFavouriteProductService: UserFavouriteProductsService,
    private toastr: ToastrService) { super(); }




  userDetails;
  ProductImageNameList: string[] = [];
  ProductNameList: string[] = [];
  ProductIdList: number[] = [];
  UserFavouriteProductIdList: number[] = [];

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(res => {
      this.userDetails = res
      localStorage.removeItem('product');
      this.selectedOption_category = JSON.parse(JSON.stringify(-1));
      this.isLoggedIn = super.tokenCheck();
      this.refreshCategoryList();
      this.refreshProductList();
    }, (error) => {
      this.toastr.error(error.error, "Error");
    });
  
  }


  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;
    });
  }

  refreshProductList() {
    this.ProductImageNameList = [];
    this.ProductNameList = [];
    this.ProductIdList = [];
    this.UserFavouriteProductIdList = [];
    console.log(this.userDetails);
    this.userFavouriteProducts.Get(this.userDetails.id).subscribe(data => {
      for (let res of data) {
        this.productService.get(res.productIndex).subscribe(productData => {
          this.ProductImageNameList.push(this.imageRoute + productData.imageName);
          this.ProductNameList.push(productData.product_Name);
          this.ProductIdList.push(productData.productID);
          this.UserFavouriteProductIdList.push(res.id);
        }, (error) => {
          this.toastr.error(error.error, "Error");
        });
      }

    });

  }



  productPictureClicked(productId: number) {
    this.productService.get(productId).subscribe(data => {
      localStorage.setItem('product', JSON.stringify(data));
      this.router.navigateByUrl('techonomy/products/' + productId);
    }, (error) => {
      this.toastr.error(error.error, "Error");
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
      console.log("removed");
      this.refreshProductList();
    }, (error) => {
      this.toastr.error(error.error, "Error");
    });
  }
}
