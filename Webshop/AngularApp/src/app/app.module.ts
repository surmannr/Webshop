import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AddModifyCategoryComponent } from './components/category/add-modify-category/add-modify-category.component';
import { CategoryComponent } from './components/category/category/category.component';
import { CategoryService } from 'src/app/services/category.service';
import { ReviewComponent } from './components/review/review/review.component';
import { ReviewListComponent } from './components/review/review-list/review-list.component';
import { AddModifyReviewComponent } from './components/review/add-modify-review/add-modify-review.component';
import { ReviewService } from 'src/app/services/review.service';
import { AddModifySupplierComponent } from './components/supplier/add-modify-supplier/add-modify-supplier.component';
import { SupplierListComponent } from './components/supplier/supplier-list/supplier-list.component';
import { SupplierService } from './services/supplier.service';
import { SupplierComponent } from './components/supplier/supplier/supplier.component';
import { UserComponent } from './components/user/user/user.component';
import { AddModifyUserComponent } from './components/user/add-modify-user/add-modify-user.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductComponent } from './components/product/product/product.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { AddModifyProductComponent } from './components/product/add-modify-product/add-modify-product.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    AddModifyCategoryComponent,
    CategoryComponent,
    ReviewComponent,   
    ReviewListComponent,
    AddModifyReviewComponent,
    SupplierComponent,
    AddModifySupplierComponent,
    SupplierListComponent,
    UserComponent,
    AddModifyUserComponent,
    UserListComponent,
    ProductComponent,
    ProductListComponent,
    AddModifyProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CategoryService, ReviewService, SupplierService, UserService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
