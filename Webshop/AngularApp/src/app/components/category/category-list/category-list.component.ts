import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  CategoryList: any = [];
  ModalTitle: string;
  ActivateAddEditCatComp: boolean = false;;
  cat: any;

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    this.refreshCatList();
  }

  refreshCatList() {
    this.service.getAll().subscribe(data => {
      this.CategoryList = data;
    });
  }

  addClick() {
    this.cat = {
      categoryId: 0,
      category_Name: ""
    }
    this.ModalTitle = "Add Category";
    this.ActivateAddEditCatComp = true;
  }

  editClick(item) {
    this.cat = item;
    this.ModalTitle = "Edit Category";
    this.ActivateAddEditCatComp = true;
  }

  closeClick() {
    this.ActivateAddEditCatComp = false;
    this.refreshCatList();
  }

  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.categoryId).subscribe(_ => {
        this.refreshCatList();
      });
    }
  }
}
