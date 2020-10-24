import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './components/category/category/category.component';
import { ProductComponent } from './components/product/product/product.component';
import { ReviewComponent } from './components/review/review/review.component';
import { SupplierComponent } from './components/supplier/supplier/supplier.component';
import { UserComponent } from './components/user/user/user.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'user', component: UserComponent },
  { path: 'product', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
