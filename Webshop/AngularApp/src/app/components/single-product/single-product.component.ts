import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { AppComponent } from '../../app.component';
import { Cart } from '../../classes/Cart';
import { Category } from '../../classes/Category';
import { Product } from '../../classes/Product';
import { ProductCart } from '../../classes/ProductCart';
import { Review } from '../../classes/Review';
import { User } from '../../classes/User';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ProductcartService } from '../../services/productcart.service';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent extends AppComponent implements OnInit {

  CategoryList: Category[];
  isLoggedIn: boolean;
  singleProductImageName: string;
  singleProduct: Product;
  ReviewList: Review[];
  UsernameList: string[];
  StarList: number[];
  RecommendedProductList: Product[];
  RecommendedProductImageRouteList: string[];
  AllProducts: Product[];
  RecommendedProductStarList: number[];
  productQuantity: number;
  cartProductIdList: number[] = [];
  cartProductQuantityList: number[] = [];
  ProductsInCart: Product[] = [];
  ProductsInCartQuantities: number[] = [];

  constructor(private categoryService: CategoryService, private productService: ProductService,
    private reviewService: ReviewService, private appComponent: AppComponent, private router: Router, private userService: UserService,
    private productCartSerivce: ProductcartService) { super(); }




  async ngOnInit() {
    this.CategoryList = [];
    this.isLoggedIn = true;
    this.ReviewList = [];
    this.UsernameList = [];
    this.StarList = [];
    this.RecommendedProductList = [];
    this.RecommendedProductImageRouteList = [];
    this.AllProducts = [];
    this.RecommendedProductStarList = [];    
    this.refreshCategoryList();
    this.productQuantity = 1;


    this.isLoggedIn = super.tokenCheck(this.isLoggedIn);
    this.productCheck();
    this.refreshRecommendedProductList();
  }


  refreshREcommendedProductStarList(product: Product) {
    let counter: number = 0;
    let sum: number = 0;
    this.reviewService.get(product.productID).subscribe(reviews => {
      if (reviews.length === 0) {
        product.stars = 0
      }
      else {
        for (let review of reviews) {
          counter = counter + 1;
          sum = sum + review.stars;
        };
        let avg = Math.ceil(sum / counter);
        product.stars = avg;
      }
      this.RecommendedProductStarList.push(product.stars);
  
    });
  }

  refreshRecommendedProductList() {
    let indexes: number[] = [];
    let random: number;
    let tmp: Product;
    let run: boolean = true;
    this.productService.getAll().subscribe(data => {
      this.AllProducts = data;
      let counter = 0;
      if (this.AllProducts.length > 5) {
        while (run) {
          random = this.getRandomInt(this.AllProducts.length);
          if (!indexes.includes(random)) {

            tmp = this.AllProducts[random];
            if (tmp.productID !== this.singleProduct.productID) {
              this.refreshREcommendedProductStarList(this.AllProducts[random]);
              indexes.push(random);
              counter = counter + 1;
              if (counter === 4) run = false;
            }           
          }
        }
        for (let i = 0; i < indexes.length; i++) {            
          this.RecommendedProductList.push(this.AllProducts[indexes[i]]);
          this.RecommendedProductImageRouteList.push(this.imageRoute + this.AllProducts[indexes[i]].imageName);          
        }
      }
      else {
        for (let i = 0; i < this.AllProducts.length; i++) {
          if (this.AllProducts[i].productID !== this.singleProduct.productID) {
            this.refreshREcommendedProductStarList(this.AllProducts[i])
            this.RecommendedProductList.push(this.AllProducts[i]);
            this.RecommendedProductImageRouteList.push(this.imageRoute + this.AllProducts[i].imageName);
            this.RecommendedProductStarList.push(this.AllProducts[i].stars);
          }
        }
      }     
    });

  }


  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  productCheck() {
    let json_product: string = localStorage.getItem('product');
    if (json_product == null) this.router.navigateByUrl("");
    else {
      this.singleProduct = JSON.parse(json_product);
      this.singleProductImageName = this.imageRoute + this.singleProduct.imageName;
      this.refreshReviewList();
    }
  }



  refreshReviewList() {
    this.reviewService.get(this.singleProduct.productID).subscribe(data => {
      this.ReviewList = data;
      for (let review of data) {
        this.UsernameList.push(review.username);
        this.StarList.push(review.stars);
      }
    });
  }

  productPictureClicked(product: Product) {    
    localStorage.removeItem('product');
    localStorage.setItem('product', JSON.stringify(product));
    this.router.navigateByUrl('techonomy/products/' + product.productID);
    this.ngOnInit();
  }


  addedToCartClicked(productQuantity: number, product: Product) {
    let userDetails;
    this.userService.getUserProfile().subscribe(data => {
      this.userService.getUserProfile().subscribe(
        res => {
          userDetails = res;
          let val: ProductCart;
          val = { productCartId: 0, productIndex: product.productID, cartIndex: userDetails.cartId, price: product.price, product_Name: product.product_Name, quantity: productQuantity };
          
          this.productCartSerivce.create(val).subscribe(res => { alert("Added the productcart"); });         
          console.log(val);
        },
        err => {
          console.log(err);
        });      
    });
   
   }

  checkQuantityInputValue() {
    if (this.productQuantity < 0)
      this.productQuantity = 0;
  }


  //Categóriára való szűrés navbar-ból
  categorySelector(categoryId: number) {
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
    this.router.navigateByUrl('techonomy/products/category/' + categoryId);
  }


  refreshCategoryList() {
    this.categoryService.getAll().subscribe(data => {
      this.CategoryList = data;
    });
  }

  checkLogin() {
    super.checkLogin(this.isLoggedIn, this.router);
  }
  onLogout() {
    super.onLogout(this.router);
  }


}
