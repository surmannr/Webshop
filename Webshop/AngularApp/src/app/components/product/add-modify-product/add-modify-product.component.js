"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddModifyProductComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var Product_1 = require("../../../classes/Product");
var AddModifyProductComponent = /** @class */ (function () {
    function AddModifyProductComponent(service, router, categoryService, supplierService, toastr) {
        var _this = this;
        this.service = service;
        this.router = router;
        this.categoryService = categoryService;
        this.supplierService = supplierService;
        this.toastr = toastr;
        this.CategoryList = [];
        this.SupplierList = [];
        this.reviewsID = [];
        this.selected_category = false;
        this.selected_supplier = false;
        this.onUpLoadFinished = new core_1.EventEmitter();
        this.uploadFile = function (files) {
            if (files.length === 0) {
                return;
            }
            var fileToUpload = files[0];
            var formData = new FormData();
            formData.append('file', fileToUpload, fileToUpload.name);
            _this.product_image_name = fileToUpload.name;
            if (!fileToUpload.type.includes("image"))
                _this.toastr.error("This is not an image", "Error");
            else {
                _this.service.uploadFile(formData).subscribe(function (event) {
                    if (event.type === http_1.HttpEventType.UploadProgress) {
                        _this.progress = Math.round(100 * event.loaded / event.total);
                    }
                    else if (event.type === http_1.HttpEventType.Response) {
                        _this.message = 'Upload success';
                        _this.onUpLoadFinished.emit(event.body);
                    }
                }, function (error) {
                    _this.toastr.error(error.error, "Error");
                });
            }
        };
    }
    AddModifyProductComponent.prototype.ngOnInit = function () {
        try {
            this.refreshCategoryList();
            this.refreshSupplierList();
            var _item_json = localStorage.getItem('item');
            this.item = JSON.parse(_item_json);
            localStorage.removeItem('item');
        }
        catch (err) {
            this.item = null;
        }
        this.swap_enabled_name = true;
        this.swap_enabled_price = true;
        this.swap_enabled_shippingPrice = true;
        this.swap_enabled_description = true;
    };
    AddModifyProductComponent.prototype.refreshSupplierList = function () {
        var _this = this;
        this.supplierService.getAll().subscribe(function (data) {
            _this.SupplierList = data;
        });
    };
    AddModifyProductComponent.prototype.refreshCategoryList = function () {
        var _this = this;
        this.categoryService.getAll().subscribe(function (data) {
            _this.CategoryList = data;
        });
    };
    AddModifyProductComponent.prototype.addProduct = function () {
        var _this = this;
        var data;
        try {
            data = {
                product_Name: this.product_Name, price: this.price,
                productID: this.productID, product_Description: this.product_Description,
                shipping_Price: this.shipping_Price, categoryId: JSON.parse(this.selectedOption_category),
                supplierId: JSON.parse(this.selectedOption_supplier), reviewsID: this.reviewsID,
                category_Name: this.category_Name, name: this.name,
                imageName: this.product_image_name, stars: 0,
                starsList: [],
                emptyStarsList: []
            };
            this.service.create(data).subscribe(function (res) { _this.router.navigate(['/product']); }, function (error) {
                _this.toastr.error(error.error, "Error");
            });
        }
        catch (error) {
            this.toastr.error("Invalid field value", "Invalid input");
        }
    };
    AddModifyProductComponent.prototype.updateProduct = function () {
        var _this = this;
        var data = new Product_1.Product();
        data.product_Name = this.product_Name;
        data.price = this.price;
        data.productID = this.item.productID;
        data.product_Description = this.product_Description;
        if (this.selectedOption_category == null)
            data.categoryId = this.item.categoryId;
        else
            data.categoryId = JSON.parse(this.selectedOption_category);
        if (this.selectedOption_supplier == null)
            data.supplierId = this.item.supplierId;
        else
            data.supplierId = JSON.parse(this.selectedOption_supplier);
        data.reviewsID = this.reviewsID;
        data.category_Name = this.category_Name;
        data.name = this.name;
        data.shipping_Price = this.shipping_Price;
        data.imageName = this.product_image_name;
        data.stars = 0;
        this.service.update(data.productID, data).subscribe(function (res) { _this.router.navigate(['/product']); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    AddModifyProductComponent.prototype.cancel = function () {
        this.router.navigate(['/product']);
    };
    AddModifyProductComponent.prototype.selectCategory = function () {
        this.selectedCategory = !this.selectedCategory;
    };
    AddModifyProductComponent.prototype.selectSupplier = function () {
        this.selected_supplier = !this.selected_supplier;
    };
    AddModifyProductComponent.prototype.swapToValueFromPlaceHolder_name = function () {
        if (this.swap_enabled_name) {
            this.product_Name = this.item.product_Name;
            this.swap_enabled_name = !this.swap_enabled_name;
        }
    };
    AddModifyProductComponent.prototype.swapToValueFromPlaceHolder_price = function () {
        if (this.swap_enabled_price) {
            this.price = this.item.price;
            this.swap_enabled_price = !this.swap_enabled_price;
        }
    };
    AddModifyProductComponent.prototype.swapToValueFromPlaceHolder_shippingPrice = function () {
        if (this.swap_enabled_shippingPrice) {
            this.shipping_Price = this.item.shipping_Price;
            this.swap_enabled_shippingPrice = !this.swap_enabled_shippingPrice;
        }
    };
    AddModifyProductComponent.prototype.swapToValueFromPlaceHolder_description = function () {
        if (this.swap_enabled_description) {
            this.product_Description = this.item.product_Description;
            this.swap_enabled_description = !this.swap_enabled_description;
        }
    };
    __decorate([
        core_1.Input()
    ], AddModifyProductComponent.prototype, "prod", void 0);
    __decorate([
        core_1.Output()
    ], AddModifyProductComponent.prototype, "onUpLoadFinished", void 0);
    AddModifyProductComponent = __decorate([
        core_1.Component({
            selector: 'app-add-modify-product',
            templateUrl: './add-modify-product.component.html',
            styleUrls: ['./add-modify-product.component.css']
        })
    ], AddModifyProductComponent);
    return AddModifyProductComponent;
}());
exports.AddModifyProductComponent = AddModifyProductComponent;
//# sourceMappingURL=add-modify-product.component.js.map