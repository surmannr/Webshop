"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddModifyOrderitemComponent = void 0;
var core_1 = require("@angular/core");
var AddModifyOrderitemComponent = /** @class */ (function () {
    function AddModifyOrderitemComponent(service, router, statusService, toastr) {
        this.service = service;
        this.router = router;
        this.statusService = statusService;
        this.toastr = toastr;
        this.StatusList = [];
        this.addForm = true;
        this.selectedStatus = false;
    }
    AddModifyOrderitemComponent.prototype.ngOnInit = function () {
        this.refreshStatusList();
        try {
            var _item_json = localStorage.getItem('item');
            this.item = JSON.parse(_item_json);
            _item_json = localStorage.getItem('orderItem');
            localStorage.removeItem('orderItem');
            this.orderItem = JSON.parse(_item_json);
            _item_json = localStorage.getItem('addForm');
            this.addForm = JSON.parse(_item_json);
            localStorage.removeItem('addForm');
        }
        catch (err) {
            this.item = null;
        }
    };
    AddModifyOrderitemComponent.prototype.refreshStatusList = function () {
        var _this = this;
        this.statusService.getAll().subscribe(function (data) {
            _this.StatusList = data;
        });
    };
    AddModifyOrderitemComponent.prototype.addOrderItem = function () {
        var _this = this;
        var val;
        val = {
            amount: this.amount, price: this.price, productID: this.productID, orderId: this.item.orderId, statusId: this.statusId,
            orderItemId: this.orderItemId, productName: this.productName, statusName: this.statusName
        };
        this.service.create(val).subscribe(function () { _this.router.navigate(['order/orderitems']); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    AddModifyOrderitemComponent.prototype.updateOrderItem = function () {
        var _this = this;
        var val;
        try {
            val = {
                amount: this.amount, price: this.price, productID: this.productID, orderId: this.item.orderId, statusId: JSON.parse(this.selectedOption_statusId),
                orderItemId: this.orderItem.orderItemId, productName: this.productName, statusName: this.statusName
            };
            this.service.update(val.orderItemId, val).subscribe(function () {
                _this.router.navigate(['order/orderitems']);
            }, function (error) {
                _this.toastr.error(error.error, "Error");
            });
        }
        catch (error) {
            this.toastr.error("Select a status");
        }
    };
    AddModifyOrderitemComponent.prototype.cancel = function () {
        this.router.navigate(['order/orderitems']);
    };
    AddModifyOrderitemComponent.prototype.selectStatus = function () {
        this.selectedStatus = !this.selectedStatus;
    };
    __decorate([
        core_1.Input()
    ], AddModifyOrderitemComponent.prototype, "orderitem", void 0);
    AddModifyOrderitemComponent = __decorate([
        core_1.Component({
            selector: 'app-add-modify-orderitem',
            templateUrl: './add-modify-orderitem.component.html',
            styleUrls: ['./add-modify-orderitem.component.css']
        })
    ], AddModifyOrderitemComponent);
    return AddModifyOrderitemComponent;
}());
exports.AddModifyOrderitemComponent = AddModifyOrderitemComponent;
//# sourceMappingURL=add-modify-orderitem.component.js.map