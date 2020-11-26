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
exports.CustomerCartComponent = void 0;
var core_1 = require("@angular/core");
var app_component_1 = require("../../app.component");
var CustomerCartComponent = /** @class */ (function (_super) {
    __extends(CustomerCartComponent, _super);
    function CustomerCartComponent(categoryService, router, productCartService, userService, orderService, orderItemService, toastr) {
        var _this = _super.call(this) || this;
        _this.categoryService = categoryService;
        _this.router = router;
        _this.productCartService = productCartService;
        _this.userService = userService;
        _this.orderService = orderService;
        _this.orderItemService = orderItemService;
        _this.toastr = toastr;
        //Ebbe van a végős adat
        _this.cartProductList = [];
        _this.cartProductQuantityList = [];
        _this.productCartList = [];
        _this.selectedOption_shipping = "none";
        _this.selectedOption_payment = "none";
        _this.paymentMethodList = ["none", "transfer in advance", "online credit card", "cash on delivery"];
        _this.shippingMethodList = ["none", "delivery courier", "delivery by post", "amazon drone"];
        _this.priceInRows = [];
        return _this;
    }
    CustomerCartComponent.prototype.ngOnInit = function () {
        this.paymentMethodList_html = this.paymentMethodList;
        this.shippingMethodList_html = this.shippingMethodList;
        this.TotalPriceWithoutTax = 0;
        this.Tax = 0;
        this.refreshCategoryList();
        this.isLoggedIn = _super.prototype.tokenCheck.call(this);
        this.refreshCartProductList();
    };
    CustomerCartComponent.prototype.refreshCartProductList = function () {
        var _this = this;
        this.userService.getUserProfile().subscribe(function (res) {
            _this.userDetails = res;
            _this.productCartService.get(_this.userDetails.cartId).subscribe(function (data) {
                _this.productCartList = data;
                _this.refreshSubTotal();
            });
        }, function (err) {
            _this.toastr.error(err, "Error");
        });
    };
    CustomerCartComponent.prototype.refreshSubTotal = function () {
        for (var _i = 0, _a = this.productCartList; _i < _a.length; _i++) {
            var productCart = _a[_i];
            this.priceInRows.push(productCart.price * productCart.quantity);
            this.TotalPriceWithoutTax = this.TotalPriceWithoutTax + productCart.price * productCart.quantity;
        }
        this.Tax = Math.ceil(this.TotalPriceWithoutTax * 0.27);
        this.TotalPriceWithTax = this.TotalPriceWithoutTax + this.Tax;
    };
    CustomerCartComponent.prototype.removeClicked = function (index) {
        var _this = this;
        this.productCartService.delete((this.productCartList[index].productCartId)).subscribe(function (_) {
            _this.refreshCartProductList();
        });
    };
    CustomerCartComponent.prototype.refreshCategoryList = function () {
        var _this = this;
        this.categoryService.getAll().subscribe(function (data) {
            _this.CategoryList = data;
        });
    };
    //Categóriára való szűrés navbar-ból
    CustomerCartComponent.prototype.categorySelector = function (categoryId) {
        localStorage.setItem('categoryId', JSON.stringify(categoryId));
        this.router.navigateByUrl('techonomy/products/category/categoryFilter/' + categoryId);
    };
    //User kiléptetés && bejelenetkezés ellenőrzés
    CustomerCartComponent.prototype.checkLogin = function () {
        _super.prototype.checkLogin.call(this, this.isLoggedIn, this.router);
    };
    CustomerCartComponent.prototype.onLogout = function () {
        _super.prototype.onLogout.call(this, this.router);
    };
    CustomerCartComponent.prototype.orderClicked = function () {
        var _this = this;
        var _orderId;
        if (this.paymentMethodList.includes(this.selectedOption_payment) && this.shippingMethodList.includes(this.selectedOption_shipping)) {
            if (this.selectedOption_payment === "none" || this.selectedOption_shipping === "none")
                this.toastr.error("Select a valid shipping and payment method", "Order failed");
            else {
                var val = void 0;
                val = {
                    userId: this.userDetails.userName, paymentMetod: this.selectedOption_payment, shippingMethod: this.selectedOption_shipping, orderTime: JSON.stringify(Date.now), statusName: "New",
                    kiVette: this.userDetails.userName, orderId: 0, orderItemsID: [0]
                };
                this.orderService.create(val).subscribe(function (res) {
                    _orderId = res;
                    for (var _i = 0, _a = _this.productCartList; _i < _a.length; _i++) {
                        var product = _a[_i];
                        var val_1 = void 0;
                        val_1 = {
                            amount: product.quantity, price: product.price, productID: product.productIndex, orderId: _orderId, statusId: 1,
                            orderItemId: 0, productName: product.product_Name, statusName: "New"
                        };
                        _this.orderItemService.create(val_1).subscribe(function () { }, function (error) {
                            _this.toastr.error(error.error, "Error");
                        });
                    }
                    _this.toastr.success("Thank you for your purchase", "Purchase was succesful");
                    _this.router.navigateByUrl("");
                    for (var _b = 0, _c = _this.productCartList; _b < _c.length; _b++) {
                        var productCart = _c[_b];
                        _this.productCartService.delete((productCart.productCartId)).subscribe(function (_) { });
                    }
                }, function (error) {
                    _this.toastr.error(error.error, "Error");
                });
            }
        }
        else
            this.toastr.error("Select a valid shipping and payment method", "Order failed");
    };
    CustomerCartComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-cart',
            templateUrl: './customer-cart.component.html',
            styleUrls: ['./customer-cart.component.css']
        })
    ], CustomerCartComponent);
    return CustomerCartComponent;
}(app_component_1.AppComponent));
exports.CustomerCartComponent = CustomerCartComponent;
//# sourceMappingURL=customer-cart.component.js.map