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
exports.MainProductsFilterProductNameComponent = void 0;
var core_1 = require("@angular/core");
var app_component_1 = require("../../app.component");
var file_1 = require("../../classes/file");
var MainProductsFilterProductNameComponent = /** @class */ (function (_super) {
    __extends(MainProductsFilterProductNameComponent, _super);
    function MainProductsFilterProductNameComponent(categoryService, productService, reviewService, router, toastr) {
        var _this = _super.call(this) || this;
        _this.categoryService = categoryService;
        _this.productService = productService;
        _this.reviewService = reviewService;
        _this.router = router;
        _this.toastr = toastr;
        _this.ProductImageNameList = [];
        return _this;
    }
    MainProductsFilterProductNameComponent.prototype.ngOnInit = function () {
        this.selectedOption_category = JSON.parse(JSON.stringify(-1));
        var productName_json = localStorage.getItem('productName');
        this.refreshProductList(JSON.parse(productName_json));
        this.inputFieldName = JSON.parse(productName_json);
        this.refreshCategoryList();
        this.isLoggedIn = _super.prototype.tokenCheck.call(this);
    };
    MainProductsFilterProductNameComponent.prototype.refreshCategoryList = function () {
        var _this = this;
        this.categoryService.getAll().subscribe(function (data) {
            _this.CategoryList = data;
        });
    };
    MainProductsFilterProductNameComponent.prototype.refreshReviewList = function (product) {
        var test = new file_1.Global_Functions();
        test.refreshReviewList(product, this.reviewService, this.toastr);
    };
    MainProductsFilterProductNameComponent.prototype.refreshProductList = function (productName) {
        var _this = this;
        this.productService.GetByCategoryIdAndProductName(-1, productName)
            .subscribe(function (data) {
            _this.ProductList = data;
            for (var _i = 0, _a = _this.ProductList; _i < _a.length; _i++) {
                var product = _a[_i];
                _this.ProductImageNameList.push(_this.imageRoute + product.imageName);
                _this.refreshReviewList(product);
            }
            ;
        });
    };
    MainProductsFilterProductNameComponent.prototype.removeFilterFromProducts = function () {
        this.router.navigateByUrl("/techonomy/products/category/nofilter");
    };
    MainProductsFilterProductNameComponent.prototype.filterClicked = function () {
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
    MainProductsFilterProductNameComponent.prototype.filterByName = function (productName) {
        localStorage.setItem('productName', JSON.stringify(productName));
        this.router.navigateByUrl('techonomy/products/category/productnameFilter/' + productName);
        this.ProductImageNameList = [];
        this.ngOnInit();
    };
    MainProductsFilterProductNameComponent.prototype.filterByCategory = function (categoryId) {
        localStorage.setItem('categoryId', JSON.stringify(categoryId));
        this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
    };
    MainProductsFilterProductNameComponent.prototype.filterByNameAndCategory = function (productName, categoryId) {
        localStorage.setItem('productName', JSON.stringify(productName));
        localStorage.setItem('categoryId', JSON.stringify(categoryId));
        this.router.navigateByUrl('techonomy/products/category/mixedFilter/categoryId/' + categoryId + "/productName/" + productName);
    };
    MainProductsFilterProductNameComponent.prototype.productPictureClicked = function (product) {
        localStorage.setItem('product', JSON.stringify(product));
        this.router.navigateByUrl('techonomy/products/' + product.productID);
    };
    //Categóriára való szűrés navbar-ból
    MainProductsFilterProductNameComponent.prototype.categorySelector = function (categoryId) {
        localStorage.setItem('categoryId', JSON.stringify(categoryId));
        this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
        this.ProductImageNameList = [];
        this.ngOnInit();
    };
    //User kiléptetés && bejelenetkezés ellenőrzés
    MainProductsFilterProductNameComponent.prototype.checkLogin = function () {
        _super.prototype.checkLogin.call(this, this.isLoggedIn, this.router);
    };
    MainProductsFilterProductNameComponent.prototype.onLogout = function () {
        _super.prototype.onLogout.call(this, this.router);
    };
    __decorate([
        core_1.Input()
    ], MainProductsFilterProductNameComponent.prototype, "selectedOption_category", void 0);
    MainProductsFilterProductNameComponent = __decorate([
        core_1.Component({
            selector: 'app-main-products-filter-product-name',
            templateUrl: './main-products-filter-product-name.component.html',
            styleUrls: ['./main-products-filter-product-name.component.css']
        })
    ], MainProductsFilterProductNameComponent);
    return MainProductsFilterProductNameComponent;
}(app_component_1.AppComponent));
exports.MainProductsFilterProductNameComponent = MainProductsFilterProductNameComponent;
//# sourceMappingURL=main-products-filter-product-name.component.js.map