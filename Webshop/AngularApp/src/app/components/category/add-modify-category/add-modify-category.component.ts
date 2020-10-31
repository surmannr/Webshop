import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../classes/Category';

@Component({
  selector: 'app-add-modify-category',
  templateUrl: './add-modify-category.component.html',
  styleUrls: ['./add-modify-category.component.css']
})
export class AddModifyCategoryComponent implements OnInit {

  constructor(private service: CategoryService, private router: Router) { }

  item: Category;

  @Input() cat: Category;
  category_Name: string;
  categoryId: number;

  ngOnInit(): void {
    try {
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
      // console.log(this.item.product_Name);
      localStorage.removeItem('item');
    } catch (err) {
      this.item = null;
    }
  }

  addCategory() {
    let val: Category;
    val = { category_Name: this.category_Name, categoryId: this.categoryId };
    this.service.create(val).subscribe(res => { this.router.navigate(['/category']); });
  }

  updateCategory() {
    let data: Category;
    data = { category_Name: this.category_Name, categoryId: this.item.categoryId };
    this.service.update(this.categoryId, data).subscribe(res => { this.router.navigate(['/category']); });
  }

}
