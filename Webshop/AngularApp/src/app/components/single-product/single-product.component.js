"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleProductComponent = void 0;
var core_1 = require("@angular/core");
var app_component_1 = require("../../app.component");
var SingleProductComponent = /** @class */ (function (_super) {
    __extends(SingleProductComponent, _super);
    function SingleProductComponent(categoryService, productService, reviewService, router, userService, productCartSerivce, usersFavouriteProducts, toastr) {
        var _this = _super.call(this) || this;
        _this.categoryService = categoryService;
        _this.productService = productService;
        _this.reviewService = reviewService;
        _this.router = router;
        _this.userService = userService;
        _this.productCartSerivce = productCartSerivce;
        _this.usersFavouriteProducts = usersFavouriteProducts;
        _this.toastr = toastr;
        _this.cartProductIdList = [];
        _this.cartProductQuantityList = [];
        _this.ProductsInCart = [];
        _this.ProductsInCartQuantities = [];
        _this.Review_description = "";
        _this.Review_stars = 0;
        _this.reviewFormIsVisible = false;
        _this.userIsAdmin = false;
        return _this;
    }
    SingleProductComponent.prototype.ngOnInit = function () {
        this.checkAdminRole();
        this.CategoryList = [];
        this.isLoggedIn = true;
        this.ReviewList = [];
        this.UsernameList = [];
        this.RecommendedProductList = [];
        this.RecommendedProductImageRouteList = [];
        this.AllProducts = [];
        this.refreshCategoryList();
        this.productQuantity = 1;
        this.isLoggedIn = _super.prototype.tokenCheck.call(this);
        this.productCheck();
        this.refreshRecommendedProductList();
    };
    SingleProductComponent.prototype.checkAdminRole = function () {
        var roleList = [];
        roleList.push("Admin");
        if (this.userService.roleMatch(roleList)) {
            console.log("user is admin");
            this.userIsAdmin = true;
        }
    };
    SingleProductComponent.prototype.refreshREcommendedProductStarList = function (product) {
        var _this = this;
        var counter = 0;
        var sum = 0;
        this.reviewService.get(product.productID).subscribe(function (reviews) {
            if (reviews.length === 0) {
                product.stars = 0;
            }
            else {
                for (var _i = 0, reviews_1 = reviews; _i < reviews_1.length; _i++) {
                    var review = reviews_1[_i];
                    counter = counter + 1;
                    sum = sum + review.stars;
                }
                ;
                product.stars = sum;
            }
        }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    SingleProductComponent.prototype.refreshRecommendedProductList = function () {
        var _this = this;
        var indexes = [];
        var random;
        var tmp;
        var run = true;
        this.productService.getAll().subscribe(function (data) {
            _this.AllProducts = data;
            var counter = 0;
            if (_this.AllProducts.length > 5) {
                while (run) {
                    random = _this.getRandomInt(_this.AllProducts.length);
                    if (!indexes.includes(random)) {
                        tmp = _this.AllProducts[random];
                        if (tmp.productID !== _this.singleProduct.productID) {
                            _this.refreshREcommendedProductStarList(_this.AllProducts[random]);
                            indexes.push(random);
                            counter = counter + 1;
                            if (counter === 4)
                                run = false;
                        }
                    }
                }
                for (var i = 0; i < indexes.length; i++) {
                    _this.RecommendedProductList.push(_this.AllProducts[indexes[i]]);
                    _this.RecommendedProductImageRouteList.push(_this.imageRoute + _this.AllProducts[indexes[i]].imageName);
                }
            }
            else {
                for (var i = 0; i < _this.AllProducts.length; i++) {
                    if (_this.AllProducts[i].productID !== _this.singleProduct.productID) {
                        _this.refreshREcommendedProductStarList(_this.AllProducts[i]);
                        _this.RecommendedProductList.push(_this.AllProducts[i]);
                        _this.RecommendedProductImageRouteList.push(_this.imageRoute + _this.AllProducts[i].imageName);
                    }
                }
            }
        });
    };
    SingleProductComponent.prototype.getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    };
    SingleProductComponent.prototype.productCheck = function () {
        var json_product = localStorage.getItem('product');
        if (json_product == null) {
            this.router.navigateByUrl("");
        }
        else {
            this.singleProduct = JSON.parse(json_product);
            this.singleProductImageName = this.imageRoute + this.singleProduct.imageName;
            this.refreshReviewList();
        }
    };
    SingleProductComponent.prototype.refreshReviewList = function () {
        var _this = this;
        this.reviewService.get(this.singleProduct.productID).subscribe(function (data) {
            _this.ReviewList = data;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var review = data_1[_i];
                _this.UsernameList.push(review.username);
                review.starsList = [];
                review.emptyStarsList = [];
                for (var i = 0; i < review.stars; i++) {
                    review.starsList.push(new Object());
                }
                for (var i = 0; i < 5 - review.stars; i++) {
                    review.emptyStarsList.push(new Object());
                }
            }
        }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    SingleProductComponent.prototype.productPictureClicked = function (product) {
        localStorage.removeItem('product');
        localStorage.setItem('product', JSON.stringify(product));
        this.router.navigateByUrl('techonomy/products/' + product.productID);
        this.ngOnInit();
    };
    SingleProductComponent.prototype.addedToCartClicked = function (productQuantity, product) {
        var _this = this;
        if (localStorage.getItem('token') != null) {
            var userDetails_1;
            this.userService.getUserProfile().subscribe(function (res) {
                userDetails_1 = res;
                var val;
                val = { productCartId: 0, productIndex: product.productID, cartIndex: userDetails_1.cartId, price: product.price, product_Name: product.product_Name, quantity: productQuantity };
                _this.productCartSerivce.create(val).subscribe(function (res) { _this.toastr.success("You can continue your shopping", "Added the productcart"); }, function (error) {
                    _this.toastr.error(error.error, "Error");
                });
            }, function (err) {
                _this.toastr.error(err, "Error");
            });
        }
        else {
            this.router.navigateByUrl('/login');
        }
    };
    SingleProductComponent.prototype.checkQuantityInputValue = function () {
        if (this.productQuantity < 0)
            this.productQuantity = 0;
    };
    //Categóriára való szűrés navbar-ból
    SingleProductComponent.prototype.categorySelector = function (categoryId) {
        localStorage.setItem('categoryId', JSON.stringify(categoryId));
        this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
    };
    SingleProductComponent.prototype.refreshCategoryList = function () {
        var _this = this;
        this.categoryService.getAll().subscribe(function (data) {
            _this.CategoryList = data;
        });
    };
    SingleProductComponent.prototype.checkLogin = function () {
        _super.prototype.checkLogin.call(this, this.isLoggedIn, this.router);
    };
    SingleProductComponent.prototype.onLogout = function () {
        _super.prototype.onLogout.call(this, this.router);
    };
    SingleProductComponent.prototype.AddToFavouriteClicked = function (product) {
        var _this = this;
        if (!this.isLoggedIn)
            this.toastr.error("You must log in to do this", "Task failed");
        else {
            var favouriteProduct_1;
            this.userService.getUserProfile().subscribe(function (data) {
                _this.userDetails = data;
                favouriteProduct_1 = {
                    productIndex: product.productID.toString(), userIndex: _this.userDetails.id, id: 0
                };
                _this.usersFavouriteProducts.Post(favouriteProduct_1).subscribe(function (_) { _this.toastr.success("You can continue your shopping", "Added to your favourites"); });
            }, function (error) {
                _this.toastr.error(error.error, "Error");
            });
        }
    };
    SingleProductComponent.prototype.OpenReviewForm = function () {
        var _this = this;
        this.userService.getUserProfile().subscribe(function (data) {
            _this.userDetails = data;
            _this.reviewFormIsVisible = true;
        }, function (error) {
            _this.toastr.error(error.error, "You must log in to do this");
        });
    };
    SingleProductComponent.prototype.CloseReviewForm = function () {
        this.reviewFormIsVisible = false;
    };
    SingleProductComponent.prototype.AddReview = function () {
        var _this = this;
        var review;
        review = {
            description: this.Review_description, stars: this.Review_stars, productId: this.singleProduct.productID,
            userId: this.userDetails.id, reviewId: 0, username: this.userDetails.userName, starsList: [], emptyStarsList: []
        };
        this.reviewService.create(review).subscribe(function (_) {
            _this.toastr.success("Review was successfully added to product");
            _this.reviewFormIsVisible = false;
            _this.ngOnInit();
        }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    SingleProductComponent.prototype.removeReview = function (index) {
        var _this = this;
        this.reviewService.delete(this.ReviewList[index].reviewId).subscribe(function (_) {
            _this.toastr.success("Removed the review");
            _this.ngOnInit();
        });
    };
    SingleProductComponent = __decorate([
        core_1.Component({
            selector: 'app-single-product',
            templateUrl: './single-product.component.html',
            styleUrls: ['./single-product.component.css']
        })
    ], SingleProductComponent);
    return SingleProductComponent;
}(app_component_1.AppComponent));
exports.SingleProductComponent = SingleProductComponent;
//# sourceMappingURL=single-product.component.js.map