import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../classes/Category';

@Component({
  selector: 'app-add-modify-category',
  templateUrl: './add-modify-category.component.html',
  styleUrls: ['./add-modify-category.component.css']
})
export class AddModifyCategoryComponent implements OnInit {

  constructor(private service: CategoryService) { }

  @Input() cat: Category;
  category_Name: string;
  categoryId: number;

  ngOnInit(): void {
    this.category_Name = this.cat.category_Name;
    this.categoryId = this.cat.categoryId;
  }

  addCategory() {
    let val: Category;
    val = { category_Name: this.category_Name, categoryId: this.categoryId };
    this.service.create(val).subscribe(res => { alert("Added the category"); });
  }

  updateCategory() {
    let data: Category;
    data = { category_Name: this.category_Name, categoryId: this.categoryId };
    this.service.update(this.categoryId, data).subscribe(res => { alert("Updated the category"); });
  }

}
