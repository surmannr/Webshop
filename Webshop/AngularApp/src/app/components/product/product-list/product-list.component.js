"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductListComponent = void 0;
var core_1 = require("@angular/core");
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(service, router, categoryService, supplierService) {
        this.service = service;
        this.router = router;
        this.categoryService = categoryService;
        this.supplierService = supplierService;
        this.ProductList = [];
        this.ImageNameList = [];
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.refreshProdList();
    };
    ProductListComponent.prototype.refreshCategory = function (id, product) {
        this.categoryService.get(id).subscribe(function (data) {
            product.category_Name = data.category_Name;
        });
    };
    ProductListComponent.prototype.refreshSupplier = function (id, product) {
        this.supplierService.get(id).subscribe(function (data) {
            product.name = data.name;
        });
    };
    ProductListComponent.prototype.refreshProdList = function () {
        var _this = this;
        this.service.getAll().subscribe(function (data) {
            _this.ProductList = data;
            for (var _i = 0, _a = _this.ProductList; _i < _a.length; _i++) {
                var product = _a[_i];
                _this.refreshCategory(product.categoryId, product);
                _this.refreshSupplier(product.supplierId, product);
            }
            ;
            for (var _b = 0, _c = _this.ProductList; _b < _c.length; _b++) {
                var product = _c[_b];
                var tmp = "https://localhost:44308/Resources/Images/" + product.imageName;
                _this.ImageNameList.push(tmp);
            }
        });
    };
    ProductListComponent.prototype.editClick = function (item) {
        localStorage.setItem('item', JSON.stringify(item));
        this.router.navigate(['/product/add']);
    };
    ProductListComponent.prototype.deleteClick = function (item) {
        var _this = this;
        if (confirm("Do you want to delete this item?")) {
            this.service.delete(item.productID).subscribe(function (_) {
                _this.refreshProdList();
            });
        }
    };
    ProductListComponent.prototype.onLogout = function () {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    };
    ProductListComponent.prototype.addProduct = function () {
        this.router.navigate(['/product/add']);
    };
    ProductListComponent = __decorate([
        core_1.Component({
            selector: 'app-product-list',
            templateUrl: './product-list.component.html',
            styleUrls: ['./product-list.component.css']
        })
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map