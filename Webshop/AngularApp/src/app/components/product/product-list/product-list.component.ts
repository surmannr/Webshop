import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../classes/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
 
})
export class ProductListComponent implements OnInit {

  ProductList: Product[] = [];

  constructor(private service: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.refreshProdList();
  }
  refreshProdList() {
    this.service.getAll().subscribe(data => {
      this.ProductList = data;
    });
    }

  editClick(item: Product) {
    localStorage.setItem('item', JSON.stringify(item));    
    this.router.navigate(['/product/add']);
  }

  deleteClick(item) {
    if (confirm("Do you want to delete this item?")) {
      this.service.delete(item.productID).subscribe(_ => {
        this.refreshProdList();
      });
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  addProduct() {
    this.router.navigate(['/product/add']);
  }
}
