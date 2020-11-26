"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddModifySupplierComponent = void 0;
var core_1 = require("@angular/core");
var AddModifySupplierComponent = /** @class */ (function () {
    function AddModifySupplierComponent(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
    }
    AddModifySupplierComponent.prototype.ngOnInit = function () {
        try {
            var _item_json = localStorage.getItem('item');
            this.item = JSON.parse(_item_json);
            localStorage.removeItem('item');
        }
        catch (err) {
            this.item = null;
        }
        this.swap_enabled_name = true;
        this.swap_enabled_multiplier = true;
        this.swap_enabled_address = true;
    };
    AddModifySupplierComponent.prototype.addSupplier = function () {
        var _this = this;
        var val;
        val = { supplierId: this.supplierId, name: this.name, address: this.address, multiplier: this.multiplier };
        this.service.create(val).subscribe(function () { _this.router.navigate(['/supplier']); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    AddModifySupplierComponent.prototype.updateSupplier = function () {
        var _this = this;
        var val;
        val = { supplierId: this.item.supplierId, name: this.name, address: this.address, multiplier: this.multiplier };
        this.service.update(val.supplierId, val).subscribe(function () { _this.router.navigate(['/supplier']); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    AddModifySupplierComponent.prototype.cancel = function () {
        this.router.navigate(['/supplier']);
    };
    AddModifySupplierComponent.prototype.swapToValueFromPlaceHolder_name = function () {
        if (this.swap_enabled_name) {
            this.name = this.item.name;
            this.swap_enabled_name = !this.swap_enabled_name;
        }
    };
    AddModifySupplierComponent.prototype.swapToValueFromPlaceHolder_address = function () {
        if (this.swap_enabled_address) {
            this.address = this.item.address;
            this.swap_enabled_address = !this.swap_enabled_address;
        }
    };
    AddModifySupplierComponent.prototype.swapToValueFromPlaceHolder_multiplier = function () {
        if (this.swap_enabled_multiplier) {
            this.multiplier = this.item.multiplier;
            this.swap_enabled_multiplier = !this.swap_enabled_multiplier;
        }
    };
    __decorate([
        core_1.Input()
    ], AddModifySupplierComponent.prototype, "sup", void 0);
    AddModifySupplierComponent = __decorate([
        core_1.Component({
            selector: 'app-add-modify-supplier',
            templateUrl: './add-modify-supplier.component.html',
            styleUrls: ['./add-modify-supplier.component.css']
        })
    ], AddModifySupplierComponent);
    return AddModifySupplierComponent;
}());
exports.AddModifySupplierComponent = AddModifySupplierComponent;
//# sourceMappingURL=add-modify-supplier.component.js.map