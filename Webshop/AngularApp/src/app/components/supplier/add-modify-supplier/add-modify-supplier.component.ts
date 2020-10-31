import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from '../../../classes/Supplier';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-add-modify-supplier',
  templateUrl: './add-modify-supplier.component.html',
  styleUrls: ['./add-modify-supplier.component.css']
})
export class AddModifySupplierComponent implements OnInit {


  constructor(private service: SupplierService, private router: Router) { }

  item: Supplier;

  @Input() sup: Supplier;  
  name: string;
  address: string;
  multiplier: number;
  supplierId: number;

  ngOnInit(): void {
    try {
      var _item_json = localStorage.getItem('item');
      this.item = JSON.parse(_item_json);
      // console.log(this.item.product_Name);
      localStorage.removeItem('item');
    } catch (err) {
      this.item = null;
    }
    console.log(this.item);
  }
  addSupplier() {
    let val: Supplier;
    val = { supplierId: this.supplierId, name: this.name, address: this.address, multiplier: this.multiplier };
    this.service.create(val).subscribe(res => { this.router.navigate(['/supplier']); });
  }

  updateSupplier() {
    let val: Supplier;
    val = { supplierId: this.item.supplierId, name: this.name, address: this.address, multiplier: this.multiplier };
    this.service.update(val.supplierId, val).subscribe(res => { this.router.navigate(['/supplier']); });
  }
}
