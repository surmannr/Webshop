import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { CartComponent } from './components/cart/cart/cart.component';
import { CartListComponent } from './components/cart/cart-list/cart-list.component';
import { AddModifyCartComponent } from './components/cart/add-modify-cart/add-modify-cart.component';
import { CartService } from './services/cart.service';
import { AddModifyOrderComponent } from './components/order/add-modify-order/add-modify-order.component';
import { OrderComponent } from './components/order/order/order.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderService } from './services/order.service';
import { OrderitemListComponent } from './components/orderitem/orderitem-list/orderitem-list.component';
import { OrderitemComponent } from './components/orderitem/orderitem/orderitem.component';
import { AddModifyOrderitemComponent } from './components/orderitem/add-modify-orderitem/add-modify-orderitem.component';
import { OrderitemService } from './services/orderitem.service';
import { ProductcartComponent } from './components/productcart/productcart/productcart.component';
import { ProductcartListComponent } from './components/productcart/productcart-list/productcart-list.component';
import { AddModifyProductcartComponent } from './components/productcart/add-modify-productcart/add-modify-productcart.component';
import { ProductcartService } from './services/productcart.service';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { AdminComponent } from './components/admin/admin.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
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
    AddModifyProductComponent,
    CartComponent,
    CartListComponent,
    AddModifyCartComponent,
    AddModifyOrderComponent,
    OrderComponent,
    OrderListComponent,
    OrderitemListComponent,
    OrderitemComponent,
    AddModifyOrderitemComponent,
    ProductcartComponent,
    ProductcartListComponent,
    AddModifyProductcartComponent,
    UserLoginComponent,
    HomeComponent,
    AdminComponent,
    ForbiddenComponent,
    LoginComponent,
    RegisterCustomerComponent,
    RegisterAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoryService,
    ReviewService,
    SupplierService,
    UserService,
    ProductService,
    CartService,
    OrderService,
    OrderitemService,
    ProductcartService,    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
