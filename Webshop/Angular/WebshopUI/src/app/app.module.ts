import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { ShowCategoriesComponent } from './category/show-categories/show-categories.component';
import { DeleteCategoriesComponent } from './category/delete-categories/delete-categories.component';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditCatComponent } from './category/add-edit-cat/add-edit-cat.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ShowCategoriesComponent,
    DeleteCategoriesComponent,
    AddEditCatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
