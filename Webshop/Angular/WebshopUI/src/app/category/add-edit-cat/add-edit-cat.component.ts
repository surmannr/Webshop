import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-add-edit-cat',
  templateUrl: './add-edit-cat.component.html',
  styleUrls: ['./add-edit-cat.component.css']
})
export class AddEditCatComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() cat: any;
  category_Name: string;
  categoryId: any;
 
  ngOnInit(): void {    
    this.category_Name = this.cat.category_Name;
    this.categoryId = this.cat.categoryId;
  }

  addCategory() {
    var val = { category_Name: this.category_Name, categoryId: this.categoryId };
    this.service.addCategory(val).subscribe(res => { alert("Added the category"); });
    
  }

  updateCategory() {
    var data = { category_Name: this.category_Name };
    this.service.updateCategory(this.categoryId,data).subscribe(res => { alert("Updated the category"); });
  }

}
