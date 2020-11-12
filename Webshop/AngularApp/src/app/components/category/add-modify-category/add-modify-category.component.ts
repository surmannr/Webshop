import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  swap_enabled: boolean;

/*--------------------------------------------*/
  category_image_name: string;
  public message: string;
  public progress: number;
  @Output() public onUpLoadFinished = new EventEmitter();


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.category_image_name = fileToUpload.name;
    // console.log(fileToUpload.name);


    this.service.uploadFile(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success';
        this.onUpLoadFinished.emit(event.body);
      }
    });;
  }


/*--------------------------------------------*/


  ngOnInit(): void {
    try {
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
      // console.log(this.item.product_Name);
      localStorage.removeItem('item');
    } catch (err) {
      this.item = null;
    }
    this.swap_enabled = true;
  }

  addCategory() {
    let val: Category;
    val = { category_Name: this.category_Name, categoryId: this.categoryId, imageName: this.category_image_name };
    this.service.create(val).subscribe(res => { this.router.navigate(['/category']); });
  }

  updateCategory() {
    let data: Category;
    data = { category_Name: this.category_Name, categoryId: this.item.categoryId, imageName: this.category_image_name };   
    this.service.update(data.categoryId, data).subscribe(res => { this.router.navigate(['/category']); });
  }
  cancel() {
    this.router.navigate(['/category']);
  }
  swapToValueFromPlaceHolder() {
    if (this.swap_enabled) {
      this.category_Name = this.item.category_Name;
      this.swap_enabled = !this.swap_enabled;
    }
   
  }
}
