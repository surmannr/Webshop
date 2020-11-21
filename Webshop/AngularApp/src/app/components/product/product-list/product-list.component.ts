import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../classes/Product';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
 
})
export class ProductListComponent implements OnInit {

  ProductList: Product[] = [];
  ImageNameList: string[] = [];
 
  constructor(private service: ProductService, private router: Router, private categoryService: CategoryService, private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.refreshProdList();
  }

  refreshCategory(id: number, product: Product) {
    this.categoryService.get(id).subscribe(data => {
      product.category_Name = data.category_Name;
    });
  }
  refreshSupplier(id: number, product: Product) {
    this.supplierService.get(id).subscribe(data => {
      product.name = data.name;
    });
  }
 
  refreshProdList() {
    this.service.getAll().subscribe(data => {
      this.ProductList = data;
      for (let product of this.ProductList) {
        this.refreshCategory(product.categoryId, product);
        this.refreshSupplier(product.supplierId, product);   
      };
    
    
      for (let product of this.ProductList) {       
        let tmp = "https://localhost:44308/Resources/Images/" + product.imageName;        
        this.ImageNameList.push(tmp);
      }
      
    });
    }

  editClick(item: Product) {
    localStorage.setItem('item', JSON.stringify(item));    
    this.router.navigate(['/product/add']);
  }

  deleteClick(item: Product) {
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
