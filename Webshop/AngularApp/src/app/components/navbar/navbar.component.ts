import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends AppComponent implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router) { super()  }

  ngOnInit(): void {
    this.refreshCategoryList();   
    this.isLoggedIn = super.tokenCheck();
  }

  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;     
    });
  }

  //User kiléptetés && bejelenetkezés ellenőrzés
  checkLogin() {
    super.checkLogin(this.isLoggedIn, this.router);
  }

  onLogout() {
    this.isLoggedIn = false;
    super.onLogout(this.router);
  }


  //Categóriára való szűrés navbar-ból
  categorySelector(categoryId: number) {
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);   
  }
 
}
