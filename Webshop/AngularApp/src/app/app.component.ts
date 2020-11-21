import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './classes/Category';
import { Product } from './classes/Product';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApp';

  protected imageRoute: string
  isLoggedIn: boolean;
  CategoryList: Category[];
  ProductList: Product[];

  


  constructor() {
    this.imageRoute = "https://localhost:44308/Resources/Images/";
    this.isLoggedIn = true;
    this.CategoryList = [];
    this.ProductList = [];
  }

  tokenCheck(): boolean {
    let json_token = localStorage.getItem('token');
    if (json_token == null) {
      return false;
    }
    return true;
  }

  checkLogin(isLoggedIn: boolean, router: Router) {
    if (!isLoggedIn)
      router.navigateByUrl('login');
  }


  onLogout(router: Router) {
    localStorage.removeItem('token');    
    router.navigateByUrl('');
  }
}
