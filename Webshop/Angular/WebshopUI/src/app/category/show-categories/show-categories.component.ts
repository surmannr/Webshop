import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-show-categories',
  templateUrl: './show-categories.component.html',
  styleUrls: ['./show-categories.component.css']
})
export class ShowCategoriesComponent implements OnInit {

  constructor(private service: SharedService) { }

  CategoryList:any = [];
  ModalTitle: string;
  ActivateAddEditCatComp: boolean = false;;
  cat: any;


  ngOnInit(): void {
    this.refreshCatList();
  }

  refreshCatList() {
    this.service.sendGetRequest().subscribe(data => {
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
      this.service.deleteCategory(item.categoryId).subscribe(_ => {
        this.refreshCatList();
      });
    }
   
  }

}
