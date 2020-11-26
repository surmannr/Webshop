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
exports.MainPage = void 0;
var core_1 = require("@angular/core");
var app_component_1 = require("../../../app.component");
var file_1 = require("../../../classes/file");
var MainPage = /** @class */ (function (_super) {
    __extends(MainPage, _super);
    function MainPage(categoryService, productService, reviewService, router, toastr) {
        var _this = _super.call(this) || this;
        _this.categoryService = categoryService;
        _this.productService = productService;
        _this.reviewService = reviewService;
        _this.router = router;
        _this.toastr = toastr;
        _this.CategoryImageNameList = [];
        _this.ProductImageNameList = [];
        _this.FeaturedCategoryImageNameList = [];
        return _this;
    }
    MainPage.prototype.ngOnInit = function () {
        this.refreshCategoryList();
        this.refreshProductList();
        this.isLoggedIn = _super.prototype.tokenCheck.call(this);
    };
    MainPage.prototype.refreshReviewList = function (product) {
        var test = new file_1.Global_Functions();
        test.refreshReviewList(product, this.reviewService, this.toastr);
    };
    MainPage.prototype.refreshProductList = function () {
        var _this = this;
        this.productService.getAll().subscribe(function (data) {
            _this.ProductList = data;
            for (var _i = 0, _a = _this.ProductList; _i < _a.length; _i++) {
                var product = _a[_i];
                _this.ProductImageNameList.push(_this.imageRoute + product.imageName);
                _this.refreshReviewList(product);
            }
            ;
        });
    };
    MainPage.prototype.refreshCategoryList = function () {
        var _this = this;
        this.categoryService.getAll().subscribe(function (data) {
            _this.CategoryList = data;
            for (var _i = 0, _a = _this.CategoryList; _i < _a.length; _i++) {
                var category = _a[_i];
                _this.CategoryImageNameList.push(_this.imageRoute + category.imageName);
                if (_this.FeaturedCategoryImageNameList.length < 3) {
                    //Here you can set logic for the featured categories
                    _this.FeaturedCategoryImageNameList.push(_this.imageRoute + category.imageName);
                }
            }
            ;
        });
    };
    MainPage.prototype.productPictureClicked = function (product) {
        localStorage.setItem('product', JSON.stringify(product));
        this.router.navigateByUrl('techonomy/products/' + product.productID);
    };
    //Categóriára való szűrés navbar-ból
    MainPage.prototype.categorySelector = function (categoryId) {
        localStorage.setItem('categoryId', JSON.stringify(categoryId));
        this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
    };
    //Categóriára való szűrés képre kattintás esetén
    MainPage.prototype.categoryPictureClicked = function (str) {
        var index = str;
        var categoryId = this.CategoryList[index].categoryId;
        localStorage.setItem('categoryId', JSON.stringify(categoryId));
        this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
    };
    MainPage.prototype.ExploreClicked = function () {
        this.router.navigateByUrl("techonomy/products/category/nofilter");
    };
    //User kiléptetés && bejelenetkezés ellenőrzés
    MainPage.prototype.checkLogin = function () {
        _super.prototype.checkLogin.call(this, this.isLoggedIn, this.router);
    };
    MainPage.prototype.onLogout = function () {
        this.isLoggedIn = false;
        _super.prototype.onLogout.call(this, this.router);
    };
    MainPage = __decorate([
        core_1.Component({
            selector: 'app-main-page.component',
            templateUrl: './main-page.component.component.html',
            styleUrls: ['./webshopstyle.css']
        })
    ], MainPage);
    return MainPage;
}(app_component_1.AppComponent));
exports.MainPage = MainPage;
//# sourceMappingURL=main-page.component.component.js.map