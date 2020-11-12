import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';
import { count } from 'rxjs/operators';
import { AppComponent } from '../../app.component';
import { Product } from '../../classes/Product';
import { ProductCart } from '../../classes/ProductCart';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ProductcartService } from '../../services/productcart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})


export class CustomerCartComponent extends AppComponent implements OnInit {
  

  constructor(private categoryService: CategoryService, private router: Router, public productService: ProductService, private productCartService: ProductcartService,
    private userService: UserService) { super(); }

  //Ebbe van a végős adat
  cartProductList: Product[] = [];
  cartProductQuantityList: number[] = [];

  productCartList: ProductCart[] = [];


  priceInRows: number[] = [];
  TotalPriceWithoutTax: number;
  Tax: number;
  TotalPriceWithTax: number;

  ngOnInit(): void {
    this.TotalPriceWithoutTax = 0;
    this.Tax = 0;
    this.refreshCategoryList();
    this.isLoggedIn = super.tokenCheck(this.isLoggedIn);
    this.refreshCartProductList();   
  }
  refreshCartProductList() {
    let userDetails;
    this.userService.getUserProfile().subscribe(_ => {
      this.userService.getUserProfile().subscribe(
        res => {
          userDetails = res;      

          this.productCartService.get(userDetails.cartId).subscribe(data => {
            this.productCartList = data;
            this.refreshSubTotal();
            console.log(this.productCartList);
          });
        },
        err => {
          console.log(err);
        });
    });
   
  }



  refreshSubTotal() {    
    for (let productCart of this.productCartList) {
      this.priceInRows.push(productCart.price * productCart.quantity);
      this.TotalPriceWithoutTax = this.TotalPriceWithoutTax + productCart.price * productCart.quantity;
    }
    this.Tax = Math.ceil(this.TotalPriceWithoutTax * 0.27);
    this.TotalPriceWithTax = this.TotalPriceWithoutTax + this.Tax;
}

  removeClicked(index: number) {
    this.productCartService.delete((this.productCartList[index].productCartId)).subscribe(_ => {
      this.refreshCartProductList();
    });
  }


  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;
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

}
