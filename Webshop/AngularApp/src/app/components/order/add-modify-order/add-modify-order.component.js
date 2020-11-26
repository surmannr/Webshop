"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddModifyOrderComponent = void 0;
var core_1 = require("@angular/core");
var AddModifyOrderComponent = /** @class */ (function () {
    function AddModifyOrderComponent(service, router, userService, statusService, toastr) {
        this.service = service;
        this.router = router;
        this.userService = userService;
        this.statusService = statusService;
        this.toastr = toastr;
        this.UserList = [];
        this.StatusList = [];
        this.selected_user = false;
        this.selectedStatus = false;
    }
    AddModifyOrderComponent.prototype.ngOnInit = function () {
        this.refreshUserList();
        this.refreshStatusList();
        try {
            var _item_json = localStorage.getItem('item');
            this.item = JSON.parse(_item_json);
            localStorage.removeItem('item');
        }
        catch (err) {
            this.item = null;
        }
    };
    AddModifyOrderComponent.prototype.refreshStatusList = function () {
        var _this = this;
        this.statusService.getAll().subscribe(function (data) {
            _this.StatusList = data;
        });
    };
    AddModifyOrderComponent.prototype.refreshUserList = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (data) {
            _this.UserList = data;
        });
    };
    AddModifyOrderComponent.prototype.addOrder = function () {
        var _this = this;
        var val;
        val = {
            userId: this.selectedOption, paymentMetod: this.paymentMetod, shippingMethod: this.shippingMethod, orderTime: this.orderTime, statusName: this.statusName,
            kiVette: this.kiVette, orderId: this.orderId, orderItemsID: this.orderItemsID
        };
        this.service.create(val).subscribe(function () { _this.router.navigate(['/order']); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    AddModifyOrderComponent.prototype.updateOrder = function () {
        var _this = this;
        var val;
        val = {
            userId: this.userName, paymentMetod: this.paymentMetod, shippingMethod: this.shippingMethod, orderTime: this.orderTime, statusName: this.selectedOption_status,
            kiVette: this.item.kiVette, orderId: this.item.orderId, orderItemsID: this.orderItemsID
        };
        this.service.update(val.orderId, val).subscribe(function () { _this.router.navigate(['/order']); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    AddModifyOrderComponent.prototype.cancel = function () {
        this.router.navigate(['/order']);
    };
    AddModifyOrderComponent.prototype.selectUser = function () {
        this.selected_user = !this.selected_user;
    };
    AddModifyOrderComponent.prototype.selectStatus = function () {
        this.selectedStatus = !this.selectedStatus;
    };
    __decorate([
        core_1.Input()
    ], AddModifyOrderComponent.prototype, "order", void 0);
    AddModifyOrderComponent = __decorate([
        core_1.Component({
            selector: 'app-add-modify-order',
            templateUrl: './add-modify-order.component.html',
            styleUrls: ['./add-modify-order.component.css']
        })
    ], AddModifyOrderComponent);
    return AddModifyOrderComponent;
}());
exports.AddModifyOrderComponent = AddModifyOrderComponent;
//# sourceMappingURL=add-modify-order.component.js.map