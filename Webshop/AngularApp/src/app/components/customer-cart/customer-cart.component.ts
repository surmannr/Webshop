import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { Order } from '../../classes/Order';
import { OrderItem } from '../../classes/OrderItem';
import { Product } from '../../classes/Product';
import { ProductCart } from '../../classes/ProductCart';
import { CategoryService } from '../../services/category.service';
import { OrderService } from '../../services/order.service';
import { OrderitemService } from '../../services/orderitem.service';
import { ProductService } from '../../services/product.service';
import { ProductcartService } from '../../services/productcart.service';
import { StatusService } from '../../services/status.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})


export class CustomerCartComponent extends AppComponent implements OnInit {


  constructor(private categoryService: CategoryService, private router: Router, public productService: ProductService, private productCartService: ProductcartService,
    private userService: UserService, private orderService: OrderService, private statusService: StatusService,
    private orderItemService: OrderitemService, private toastr: ToastrService) { super(); }

  //Ebbe van a végős adat
  cartProductList: Product[] = [];
  cartProductQuantityList: number[] = [];

  productCartList: ProductCart[] = [];


  selectedOption_shipping = "none";
  selectedOption_payment = "none";

  paymentMethodList: string[] = ["none", "transfer in advance", "online credit card", "cash on delivery"];
  shippingMethodList: string[] = ["none", "delivery courier", "delivery by post", "amazon drone"];

  paymentMethodList_html: string[];
  shippingMethodList_html: string[];
  userDetails;
  priceInRows: number[] = [];
  TotalPriceWithoutTax: number;
  Tax: number;
  TotalPriceWithTax: number;

  ngOnInit(): void {
    this.paymentMethodList_html = this.paymentMethodList;
    this.shippingMethodList_html = this.shippingMethodList;
    this.TotalPriceWithoutTax = 0;
    this.Tax = 0;
    this.refreshCategoryList();
    this.isLoggedIn = super.tokenCheck(this.isLoggedIn);
    this.refreshCartProductList();
    this.getUserProfile();
  }
  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      });
  }
  refreshCartProductList() {
    let userDetails;
    this.userService.getUserProfile().subscribe(_ => {
      this.userService.getUserProfile().subscribe(
        res => {
          userDetails = res;

          this.productCartService.get(userDetails.cartId).subscribe(data => {
            this.productCartList = data;
            this.refreshSubTotal();
          });
        },
        err => {
          console.log(err);
        });
    });

  }



  refreshSubTotal() {
    for (let productCart of this.productCartList) {
      this.priceInRows.push(productCart.price * productCart.quantity);
      this.TotalPriceWithoutTax = this.TotalPriceWithoutTax + productCart.price * productCart.quantity;
    }
    this.Tax = Math.ceil(this.TotalPriceWithoutTax * 0.27);
    this.TotalPriceWithTax = this.TotalPriceWithoutTax + this.Tax;
  }

  removeClicked(index: number) {
    this.productCartService.delete((this.productCartList[index].productCartId)).subscribe(_ => {
      this.refreshCartProductList();
    });
  }


  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;
    });
  }

  //Categóriára való szűrés navbar-ból
  categorySelector(categoryId: number) {
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
  }

  //User kiléptetés && bejelenetkezés ellenőrzés
  checkLogin() {
    super.checkLogin(this.isLoggedIn, this.router);
  }
  onLogout() {
    super.onLogout(this.router);
  }

  orderClicked() {
    let _orderId;
    if (this.paymentMethodList.includes(this.selectedOption_payment) && this.shippingMethodList.includes(this.selectedOption_shipping)) {
      if (this.selectedOption_payment === "none" || this.selectedOption_shipping === "none") this.toastr.error("Select a valid shipping and payment method", "Order failed");
      else {
        let val: Order;
        val = {
          userId: this.userDetails.userName, paymentMetod: this.selectedOption_payment, shippingMethod: this.selectedOption_shipping, orderTime: JSON.stringify(Date.now), statusName: "New",
          kiVette: this.userDetails.userName, orderId: 0, orderItemsID: [0]
        };
        this.orderService.create(val).subscribe(res => {
          _orderId = res;
          for (let product of this.productCartList) {
            let val: OrderItem;
            val = {
              amount: product.quantity, price: product.price, productID: product.productIndex, orderId: _orderId, statusId: 1,
              orderItemId: 0, productName: product.product_Name, statusName: "New"
            };
            this.orderItemService.create(val).subscribe(res => {});
          }
          this.toastr.success("Thank you for your purchase","Purchase was succesful");
          this.router.navigateByUrl("");

          for (let productCart of this.productCartList) {
            this.productCartService.delete((productCart.productCartId)).subscribe(_ => {});
          }
        });
      }
    }
    else this.toastr.error("Select a valid shipping and payment method", "Order failed");
  }

}
