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

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'user', component: UserComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'orderitem', component: OrderitemComponent },
  { path: 'productcart', component: ProductcartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
