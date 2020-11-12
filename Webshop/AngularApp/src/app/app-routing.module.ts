import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './components/category/category/category.component';
import { ProductComponent } from './components/product/product/product.component';
import { SupplierComponent } from './components/supplier/supplier/supplier.component';
import { UserComponent } from './components/user/user/user.component';
import { OrderComponent } from './components/order/order/order.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/auth/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { EditUserCredentials } from './components/home/editCredentials/editUserCredentials';
import { AddModifyProductComponent } from './components/product/add-modify-product/add-modify-product.component';
import { AddModifySupplierComponent } from './components/supplier/add-modify-supplier/add-modify-supplier.component';
import { AddModifyCategoryComponent } from './components/category/add-modify-category/add-modify-category.component';
import { AddModifyUserComponent } from './components/user/add-modify-user/add-modify-user.component';
import { AddModifyOrderComponent } from './components/order/add-modify-order/add-modify-order.component';
import { OrderitemComponent } from './components/orderitem/orderitem/orderitem.component';
import { AddModifyOrderitemComponent } from './components/orderitem/add-modify-orderitem/add-modify-orderitem.component';
import { MainPage } from './components/main/main-page.component/main-page.component.component';
import { MainProductsComponent } from './components/main-products/main-products.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CustomerCartComponent } from './components/customer-cart/customer-cart.component';
import { MainFavouritesComponent } from './components/main-favourites/main-favourites.component';
const routes: Routes = [  
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },  
  { path: 'supplier', component: SupplierComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] }},
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } }, 
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },  
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'adminRegister', component: RegisterAdminComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] }  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterCustomerComponent },
  { path: 'user/edit', component: EditUserCredentials, canActivate: [AuthGuard] },
  { path: 'product/add', component: AddModifyProductComponent  , canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'supplier/add', component: AddModifySupplierComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'category/add', component: AddModifyCategoryComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'user/add', component: AddModifyUserComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'order/add', component: AddModifyOrderComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'order/orderitems', component: OrderitemComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'order/orderitems/add', component: AddModifyOrderitemComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: '', component: MainPage },
  { path: 'techonomy/products/category/:id', component: MainProductsComponent },
  { path: 'techonomy/products/:id', component: SingleProductComponent },
  { path: 'techonomy/cart', component: CustomerCartComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Customer'] } },
  { path: 'techonomy/favourites', component: MainFavouritesComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Customer'] }  }
 
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
