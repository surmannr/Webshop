import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Product } from '../../classes/Product';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent extends AppComponent implements OnInit {
  

  constructor(private categoryService: CategoryService, private router: Router) { super(); }

  cartProductList: Product[] = [];
  cartProductQuantityList: number[] = [];
  ProductsInCart: Product[] = [];
  ProductsInCartQuantities: number[] = [];
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
    this.refreshSubTotal();
  }
  refreshCartProductList() {
    let json_productsInCart = localStorage.getItem('productsInCart');
    let json_productQuantitiesInCart = localStorage.getItem('productQuantitiesInCart');    
    if (json_productsInCart != null && json_productQuantitiesInCart != null ) {
      this.cartProductList = JSON.parse(localStorage.getItem('productsInCart'));
      this.cartProductQuantityList = JSON.parse(localStorage.getItem('productQuantitiesInCart'));      
    }
    let counter: number = 0;
    for (let product of this.ProductsInCart) {
      this.cartProductList.push(product);
      this.cartProductQuantityList.push(this.ProductsInCartQuantities[counter]);
      counter = counter + 1;      
      localStorage.setItem('productsInCart', JSON.stringify(this.cartProductList));
      localStorage.setItem('productQuantitiesInCart', JSON.stringify(this.cartProductQuantityList));
    }
    this.ProductsInCart = [];
    this.ProductsInCartQuantities = [];
  }

  refreshSubTotal() {
    let index = 0;
    for (let product of this.cartProductList) {
      let tmp = this.cartProductQuantityList[index];
      this.priceInRows.push(product.price * tmp);
      index = index + 1;
      this.TotalPriceWithoutTax = this.TotalPriceWithoutTax + product.price * tmp;
    }
    this.Tax = Math.ceil(this.TotalPriceWithoutTax * 0.27);
    this.TotalPriceWithTax = this.TotalPriceWithoutTax + this.Tax;
}

  removeClicked(index: number) {
    this.cartProductList.splice(index,1);
    this.cartProductQuantityList.splice(index, 1);
    localStorage.setItem('productsInCart', JSON.stringify(this.cartProductList));
    localStorage.setItem('productQuantitiesInCart', JSON.stringify(this.cartProductQuantityList));
  }


  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;
    });
  }

  //Categóriára való szűrés navbar-ból
  categorySelector(categoryId: number) {
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products/category/' + categoryId);
  }

  //User kiléptetés && bejelenetkezés ellenőrzés
  checkLogin() {
    super.checkLogin(this.isLoggedIn, this.router);
  }
  onLogout() {
    super.onLogout(this.router);
  }

}
