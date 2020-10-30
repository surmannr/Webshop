import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './components/category/category/category.component';
import { ProductComponent } from './components/product/product/product.component';
import { ReviewComponent } from './components/review/review/review.component';
import { SupplierComponent } from './components/supplier/supplier/supplier.component';
import { UserComponent } from './components/user/user/user.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { OrderComponent } from './components/order/order/order.component';
import { OrderitemComponent } from './components/orderitem/orderitem/orderitem.component';
import { ProductcartComponent } from './components/productcart/productcart/productcart.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/auth/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { EditUserCredentials } from './components/home/editCredentials/editUserCredentials';
import { AddModifyProductComponent } from './components/product/add-modify-product/add-modify-product.component';
const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'supplier', component: SupplierComponent },
  {
    path: 'user', component: UserComponent},
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'orderitem', component: OrderitemComponent },
  { path: 'productcart', component: ProductcartComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'adminRegister', component: RegisterAdminComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] }  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterCustomerComponent },
  { path: 'user/edit', component: EditUserCredentials, canActivate: [AuthGuard] },
  { path: 'product/add', component: AddModifyProductComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
