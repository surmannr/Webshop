import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier.service';
import { Supplier } from '../../../classes/Supplier';
@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  SupplierList: Supplier[] = [];
 

  constructor(private service: SupplierService, private router: Router) { }

  ngOnInit(): void {
    this.refreshSupList();
  }
  refreshSupList() {
    this.service.getAll().subscribe(data => {
      this.SupplierList = data;
    });
  }

  editClick(item: Supplier) {
    localStorage.setItem('item', JSON.stringify(item));
    this.router.navigate(['/supplier/add']);
  }

  deleteClick(item: Supplier) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.supplierId).subscribe(_ => {
        this.refreshSupList();
      });
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  addSupplier() {
    this.router.navigate(['/supplier/add']);
  }
}
