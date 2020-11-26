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
exports.MainFavouritesComponent = void 0;
var core_1 = require("@angular/core");
var app_component_1 = require("../../app.component");
var MainFavouritesComponent = /** @class */ (function (_super) {
    __extends(MainFavouritesComponent, _super);
    function MainFavouritesComponent(categoryService, userFavouriteProducts, productService, userService, router, userFavouriteProductService, toastr) {
        var _this = _super.call(this) || this;
        _this.categoryService = categoryService;
        _this.userFavouriteProducts = userFavouriteProducts;
        _this.productService = productService;
        _this.userService = userService;
        _this.router = router;
        _this.userFavouriteProductService = userFavouriteProductService;
        _this.toastr = toastr;
        _this.ProductImageNameList = [];
        _this.ProductNameList = [];
        _this.ProductIdList = [];
        _this.UserFavouriteProductIdList = [];
        return _this;
    }
    MainFavouritesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserProfile().subscribe(function (res) {
            _this.userDetails = res;
            localStorage.removeItem('product');
            _this.selectedOption_category = JSON.parse(JSON.stringify(-1));
            _this.isLoggedIn = _super.prototype.tokenCheck.call(_this);
            _this.refreshCategoryList();
            _this.refreshProductList();
        }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    MainFavouritesComponent.prototype.refreshCategoryList = function () {
        var _this = this;
        this.categoryService.getAll().subscribe(function (data) {
            _this.CategoryList = data;
        });
    };
    MainFavouritesComponent.prototype.refreshProductList = function () {
        var _this = this;
        this.ProductImageNameList = [];
        this.ProductNameList = [];
        this.ProductIdList = [];
        this.UserFavouriteProductIdList = [];
        console.log(this.userDetails);
        this.userFavouriteProducts.Get(this.userDetails.id).subscribe(function (data) {
            var _loop_1 = function (res) {
                _this.productService.get(res.productIndex).subscribe(function (productData) {
                    _this.ProductImageNameList.push(_this.imageRoute + productData.imageName);
                    _this.ProductNameList.push(productData.product_Name);
                    _this.ProductIdList.push(productData.productID);
                    _this.UserFavouriteProductIdList.push(res.id);
                }, function (error) {
                    _this.toastr.error(error.error, "Error");
                });
            };
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var res = data_1[_i];
                _loop_1(res);
            }
        });
    };
    MainFavouritesComponent.prototype.productPictureClicked = function (productId) {
        var _this = this;
        this.productService.get(productId).subscribe(function (data) {
            localStorage.setItem('product', JSON.stringify(data));
            _this.router.navigateByUrl('techonomy/products/' + productId);
        }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    //Categóriára való szűrés navbar-ból
    MainFavouritesComponent.prototype.categorySelector = function (categoryId) {
        localStorage.setItem('categoryId', JSON.stringify(categoryId));
        this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
    };
    //User kiléptetés && bejelenetkezés ellenőrzés
    MainFavouritesComponent.prototype.checkLogin = function () {
        _super.prototype.checkLogin.call(this, this.isLoggedIn, this.router);
    };
    MainFavouritesComponent.prototype.onLogout = function () {
        _super.prototype.onLogout.call(this, this.router);
    };
    MainFavouritesComponent.prototype.removeFromFavourite = function (index) {
        var _this = this;
        this.userFavouriteProductService.Delete(index).subscribe(function (_) {
            console.log("removed");
            _this.refreshProductList();
        }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    __decorate([
        core_1.Input()
    ], MainFavouritesComponent.prototype, "selectedOption_category", void 0);
    MainFavouritesComponent = __decorate([
        core_1.Component({
            selector: 'app-main-favourites',
            templateUrl: './main-favourites.component.html',
            styleUrls: ['./main-favourites.component.css']
        })
    ], MainFavouritesComponent);
    return MainFavouritesComponent;
}(app_component_1.AppComponent));
exports.MainFavouritesComponent = MainFavouritesComponent;
//# sourceMappingURL=main-favourites.component.js.map