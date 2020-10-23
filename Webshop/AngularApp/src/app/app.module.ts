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


@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    AddModifyCategoryComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
