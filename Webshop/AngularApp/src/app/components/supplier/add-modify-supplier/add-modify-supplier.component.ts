import { Component, Input, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-add-modify-supplier',
  templateUrl: './add-modify-supplier.component.html',
  styleUrls: ['./add-modify-supplier.component.css']
})
export class AddModifySupplierComponent implements OnInit {


  constructor(private service: SupplierService) { }

  @Input() sup: any;  
  name: string;
  address: string;
  multiplier: number;
  supplierId: number;

  ngOnInit(): void {
    this.name = this.sup.name;
    this.address = this.sup.address;
    this.multiplier = this.sup.multiplier;
    this.supplierId = this.sup.supplierId;
  }
  addSupplier() {
    var val = { supplierId: this.supplierId, name: this.name, address: this.address, multiplier: this.multiplier};
    this.service.create(val).subscribe(res => { alert("Added the supplier"); });
  }

  updateSupplier() {
    var val = { supplierId: this.supplierId, name: this.name, address: this.address, multiplier: this.multiplier };
    this.service.update(this.supplierId, val).subscribe(res => { alert("Updated the supplier"); });
  }
}
