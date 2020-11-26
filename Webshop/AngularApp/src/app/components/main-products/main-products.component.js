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
exports.MainProductsComponent = void 0;
var core_1 = require("@angular/core");
var app_component_1 = require("../../app.component");
var file_1 = require("../../classes/file");
var MainProductsComponent = /** @class */ (function (_super) {
    __extends(MainProductsComponent, _super);
    function MainProductsComponent(categoryService, productService, reviewService, router, toastr) {
        var _this = _super.call(this) || this;
        _this.categoryService = categoryService;
        _this.productService = productService;
        _this.reviewService = reviewService;
        _this.router = router;
        _this.toastr = toastr;
        _this.ProductImageNameList = [];
        return _this;
    }
    MainProductsComponent.prototype.ngOnInit = function () {
        localStorage.removeItem('categoryId');
        localStorage.removeItem('productName');
        this.selectedOption_category = JSON.parse(JSON.stringify(-1));
        this.refreshCategoryList();
        this.refreshProductList();
        this.isLoggedIn = _super.prototype.tokenCheck.call(this);
    };
    MainProductsComponent.prototype.refreshCategoryList = function () {
        var _this = this;
        this.categoryService.getAll().subscribe(function (data) {
            _this.CategoryList = data;
        });
    };
    MainProductsComponent.prototype.refreshReviewList = function (product) {
        var test = new file_1.Global_Functions();
        test.refreshReviewList(product, this.reviewService, this.toastr);
    };
    MainProductsComponent.prototype.refreshProductList = function () {
        var _this = this;
        this.productService.getAll().subscribe(function (data) {
            _this.ProductList = data;
            for (var _i = 0, _a = _this.ProductList; _i < _a.length; _i++) {
                var product = _a[_i];
                _this.ProductImageNameList.push(_this.imageRoute + product.imageName);
                _this.refreshReviewList(product);
            }
            ;
            var json_categoryId = localStorage.getItem('categoryId');
            if (json_categoryId !== null) {
                _this.filterByCategory(JSON.parse(json_categoryId));
                localStorage.removeItem('categoryId');
            }
        });
    };
    MainProductsComponent.prototype.removeFilterFromProducts = function () {
        this.router.navigateByUrl("/techonomy/products/category/nofilter");
    };
    MainProductsComponent.prototype.filterClicked = function () {
        //Remove the previous filter form the products
        this.removeFilterFromProducts();
        var teszt = new file_1.Global_Functions();
        switch (teszt.filterClicked(this.inputFieldName, this.selectedOption_category)) {
            case "filterByName": {
                this.filterByName(this.inputFieldName);
                break;
            }
            case "filterByCategory": {
                this.filterByCategory(JSON.parse(this.selectedOption_category));
                break;
            }
            case "filterByNameAndCategory": {
                this.filterByNameAndCategory(this.inputFieldName, JSON.parse(this.selectedOption_category));
                break;
            }
            default: {
                this.removeFilterFromProducts();
            }
        }
    };
    MainProductsComponent.prototype.filterByName = function (productName) {
        localStorage.setItem('productName', JSON.stringify(productName));
        this.router.navigateByUrl('techonomy/products/category/productnameFilter/' + productName);
    };
    MainProductsComponent.prototype.filterByCategory = function (categoryId) {
        localStorage.setItem('categoryId', JSON.stringify(categoryId));
        this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
    };
    MainProductsComponent.prototype.filterByNameAndCategory = function (productName, categoryId) {
        localStorage.setItem('productName', JSON.stringify(productName));
        localStorage.setItem('categoryId', JSON.stringify(categoryId));
        this.router.navigateByUrl('techonomy/products/category/mixedFilter/categoryId/' + categoryId + "/productName/" + productName);
    };
    MainProductsComponent.prototype.productPictureClicked = function (product) {
        localStorage.setItem('product', JSON.stringify(product));
        this.router.navigateByUrl('techonomy/products/' + product.productID);
    };
    //Categóriára való szűrés navbar-ból
    MainProductsComponent.prototype.categorySelector = function (categoryId) {
        this.removeFilterFromProducts();
        this.filterByCategory(categoryId);
    };
    //User kiléptetés && bejelenetkezés ellenőrzés
    MainProductsComponent.prototype.checkLogin = function () {
        _super.prototype.checkLogin.call(this, this.isLoggedIn, this.router);
    };
    MainProductsComponent.prototype.onLogout = function () {
        _super.prototype.onLogout.call(this, this.router);
    };
    __decorate([
        core_1.Input()
    ], MainProductsComponent.prototype, "selectedOption_category", void 0);
    MainProductsComponent = __decorate([
        core_1.Component({
            selector: 'app-main-products',
            templateUrl: './main-products.component.html',
            styleUrls: ['./webshopstyle.css']
        })
    ], MainProductsComponent);
    return MainProductsComponent;
}(app_component_1.AppComponent));
exports.MainProductsComponent = MainProductsComponent;
//# sourceMappingURL=main-products.component.js.map