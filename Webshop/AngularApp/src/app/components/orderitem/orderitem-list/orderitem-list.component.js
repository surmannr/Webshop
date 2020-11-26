"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderitemListComponent = void 0;
var core_1 = require("@angular/core");
var OrderitemListComponent = /** @class */ (function () {
    function OrderitemListComponent(service, router, userService, productService, statusService) {
        this.service = service;
        this.router = router;
        this.userService = userService;
        this.productService = productService;
        this.statusService = statusService;
        this.OrderItemList = [];
    }
    OrderitemListComponent.prototype.ngOnInit = function () {
        try {
            var _item_json = localStorage.getItem('item');
            this.item = JSON.parse(_item_json);
        }
        catch (err) {
            console.log(err);
        }
        this.refreshOrderItemList();
    };
    OrderitemListComponent.prototype.refreshProduct = function (id, orderItem) {
        this.productService.get(id).subscribe(function (data) {
            orderItem.productName = data.product_Name;
        });
    };
    OrderitemListComponent.prototype.refreshStatus = function (id, orderItem) {
        this.statusService.get(id).subscribe(function (data) {
            orderItem.statusName = data.name;
        });
    };
    OrderitemListComponent.prototype.refreshOrderItemList = function () {
        var _this = this;
        this.service.getByOrderId(this.item.orderId).subscribe(function (data) {
            _this.OrderItemList = data;
            for (var _i = 0, _a = _this.OrderItemList; _i < _a.length; _i++) {
                var orderItem = _a[_i];
                _this.refreshProduct(orderItem.productID, orderItem);
                _this.refreshStatus(orderItem.statusId, orderItem);
            }
            ;
        });
    };
    OrderitemListComponent.prototype.editClick = function (item) {
        localStorage.setItem('orderItem', JSON.stringify(item));
        localStorage.setItem('addForm', JSON.stringify(false));
        this.router.navigate(['/order/orderitems/add']);
    };
    OrderitemListComponent.prototype.deleteClick = function (item) {
        var _this = this;
        if (confirm("Do you want to delete this item?")) {
            this.service.delete(item.orderItemId).subscribe(function (_) {
                _this.refreshOrderItemList();
            });
        }
    };
    OrderitemListComponent.prototype.onLogout = function () {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    };
    OrderitemListComponent.prototype.goBack = function () {
        localStorage.removeItem('item');
        this.router.navigate(['/order']);
    };
    OrderitemListComponent = __decorate([
        core_1.Component({
            selector: 'app-orderitem-list',
            templateUrl: './orderitem-list.component.html',
            styleUrls: ['./orderitem-list.component.css']
        })
    ], OrderitemListComponent);
    return OrderitemListComponent;
}());
exports.OrderitemListComponent = OrderitemListComponent;
//# sourceMappingURL=orderitem-list.component.js.map