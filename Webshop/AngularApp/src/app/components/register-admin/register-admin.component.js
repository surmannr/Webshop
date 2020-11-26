"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterAdminComponent = void 0;
var core_1 = require("@angular/core");
var file_1 = require("../../classes/file");
var RegisterAdminComponent = /** @class */ (function () {
    function RegisterAdminComponent(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
        this.avatarImageRoute = this.service.avatarImageRoute;
    }
    RegisterAdminComponent.prototype.ngOnInit = function () {
        this.global_functions = new file_1.Global_Functions();
        this.id = this.global_functions.makeid(10);
        this.username = "";
        this.email = "";
        this.password = "";
    };
    RegisterAdminComponent.prototype.addUser = function () {
        var _this = this;
        var val;
        val = { id: this.id, username: this.username, email: this.email, password: this.password };
        this.service.createAdmin(val).subscribe(function (res) { _this.router.navigate(['/user']); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    RegisterAdminComponent.prototype.cancel = function () {
        this.router.navigate(['/user']);
    };
    __decorate([
        core_1.Input()
    ], RegisterAdminComponent.prototype, "user", void 0);
    RegisterAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-register-admin',
            templateUrl: './register-admin.component.html',
            styleUrls: ['./register-admin.component.css']
        })
    ], RegisterAdminComponent);
    return RegisterAdminComponent;
}());
exports.RegisterAdminComponent = RegisterAdminComponent;
//# sourceMappingURL=register-admin.component.js.map