"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCustomerComponent = void 0;
var core_1 = require("@angular/core");
var file_1 = require("../../classes/file");
var RegisterCustomerComponent = /** @class */ (function () {
    function RegisterCustomerComponent(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
        this.avatarImageRoute = this.service.avatarImageRoute;
    }
    RegisterCustomerComponent.prototype.ngOnInit = function () {
        this.global_functions = new file_1.Global_Functions();
        this.id = this.global_functions.makeid(10);
        this.username = "";
        this.email = "";
        this.password = "";
    };
    RegisterCustomerComponent.prototype.addUser = function () {
        var _this = this;
        this.service.getAll().subscribe(function (res) {
            var val;
            val = { id: _this.id, username: _this.username, email: _this.email, password: _this.password };
            if (res.length == 0)
                _this.service.createAdmin(val).subscribe(function (_) { _this.router.navigate(['/user']); }, function (error) {
                    _this.toastr.error(error.error, "Error");
                });
            else
                _this.service.create(val).subscribe(function (_) { _this.router.navigate(['/user']); }, function (error) {
                    _this.toastr.error(error.error, "Error");
                });
        });
    };
    __decorate([
        core_1.Input()
    ], RegisterCustomerComponent.prototype, "user", void 0);
    RegisterCustomerComponent = __decorate([
        core_1.Component({
            selector: 'app-register-customer',
            templateUrl: './register-customer.component.html',
            styleUrls: ['./register-customer.component.css']
        })
    ], RegisterCustomerComponent);
    return RegisterCustomerComponent;
}());
exports.RegisterCustomerComponent = RegisterCustomerComponent;
//# sourceMappingURL=register-customer.component.js.map