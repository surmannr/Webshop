import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { Supplier } from '../../../classes/Supplier';
@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  SupplierList: Supplier[] = [];
  ModalTitle: string;
  ActivateAddEditSupComp: boolean = false;
  sup: Supplier;

  constructor(private service: SupplierService) { }

  ngOnInit(): void {
    this.refreshSupList();
  }
  refreshSupList() {
    this.service.getAll().subscribe(data => {
      this.SupplierList = data;
    });
  }
  addClick() {
    this.sup = {
      supplierId: 0,
      name: "",
      address: "",
      multiplier: 0
    }
    this.ModalTitle = "Add Supplier";
    this.ActivateAddEditSupComp = true;
  }

  editClick(item) {
    this.sup = item;
    this.ModalTitle = "Edit Supplier";
    this.ActivateAddEditSupComp = true;
  }

  closeClick() {
    this.ActivateAddEditSupComp = false;
    this.refreshSupList();
  }

  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.supplierId).subscribe( _ => {
        this.refreshSupList();
      });
    }
  }

}
