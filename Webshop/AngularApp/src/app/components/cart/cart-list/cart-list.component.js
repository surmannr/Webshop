"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartListComponent = void 0;
var core_1 = require("@angular/core");
var CartListComponent = /** @class */ (function () {
    function CartListComponent(service) {
        this.service = service;
        this.CartList = [];
        this.ActivateAddEditCartComp = false;
    }
    CartListComponent.prototype.ngOnInit = function () {
        this.refreshCartList();
    };
    CartListComponent.prototype.refreshCartList = function () {
        var _this = this;
        this.service.getAll().subscribe(function (data) {
            _this.CartList = data;
        });
    };
    CartListComponent.prototype.addClick = function () {
        this.cart = {
            cartId: 0,
            userId: "",
            user: "",
            productsID: [0]
        };
        this.ModalTitle = "Add Cart";
        this.ActivateAddEditCartComp = true;
    };
    CartListComponent.prototype.closeClick = function () {
        this.ActivateAddEditCartComp = false;
        this.refreshCartList();
    };
    CartListComponent.prototype.deleteClick = function (item) {
        var _this = this;
        if (confirm("Do you want to delete this item?")) {
            this.service.delete(item.cartId).subscribe(function (_) {
                _this.refreshCartList();
            });
        }
    };
    CartListComponent = __decorate([
        core_1.Component({
            selector: 'app-cart-list',
            templateUrl: './cart-list.component.html',
            styleUrls: ['./cart-list.component.css']
        })
    ], CartListComponent);
    return CartListComponent;
}());
exports.CartListComponent = CartListComponent;
//# sourceMappingURL=cart-list.component.js.map