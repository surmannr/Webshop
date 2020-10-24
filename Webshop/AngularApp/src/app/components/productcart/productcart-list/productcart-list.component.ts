import { Component, OnInit } from '@angular/core';
import { ProductcartService } from '../../../services/productcart.service';

@Component({
  selector: 'app-productcart-list',
  templateUrl: './productcart-list.component.html',
  styleUrls: ['./productcart-list.component.css']
})
export class ProductcartListComponent implements OnInit {

  ProductcartList: any = [];
  ModalTitle: string;
  ActivateAddEditpcartComp: boolean = false;;
  pcart: any;

  constructor(private service: ProductcartService) { }

  ngOnInit(): void {
    this.refreshPCartList();
  }
  refreshPCartList() {
    this.service.getAll().subscribe(data => {
      this.ProductcartList = data;
    });
  }
  addClick() {
    this.pcart = {
      productCartId: 0,
      productId: 0,
      cartId: 0
    }
    this.ModalTitle = "Add ProductCart";
    this.ActivateAddEditpcartComp = true;
  }

  editClick(item) {
    this.pcart = item;
    this.ModalTitle = "Edit ProductCart";
    this.ActivateAddEditpcartComp = true;
  }

  closeClick() {
    this.ActivateAddEditpcartComp = false;
    this.refreshPCartList();
  }

  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.productCartId).subscribe(_ => {
        this.refreshPCartList();
      });
    }
  }
}
