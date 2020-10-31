import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../classes/Category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  CategoryList: Category[] = []; 

  constructor(private service: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.refreshCatList();
  }
  refreshCatList() {
    this.service.getAll().subscribe(data => {
      this.CategoryList = data;
    });
  }

  editClick(item: Category) {
    localStorage.setItem('item', JSON.stringify(item));
    this.router.navigate(['/category/add']);
  }
  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.categoryId).subscribe(_ => {
        this.refreshCatList();
      });
    }
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  addCategory() {
    this.router.navigate(['/category/add']);
  }
}
