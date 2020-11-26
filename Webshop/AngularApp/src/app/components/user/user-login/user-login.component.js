"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginComponent = void 0;
var core_1 = require("@angular/core");
var UserLoginComponent = /** @class */ (function () {
    function UserLoginComponent(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
        this.formModel = {
            Username: '',
            Password: ''
        };
    }
    UserLoginComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('token') != null) {
            this.router.navigate(['home']);
        }
    };
    UserLoginComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.service.login(form.value).subscribe(function (res) {
            localStorage.setItem('token', res.token);
            _this.router.navigateByUrl('/home');
        }, function (err) {
            if (err.status == 400) {
                _this.toastr.error(err, "Error");
            }
        });
    };
    UserLoginComponent = __decorate([
        core_1.Component({
            selector: 'app-user-login',
            templateUrl: './user-login.component.html',
            styleUrls: ['./user-login.component.css']
        })
    ], UserLoginComponent);
    return UserLoginComponent;
}());
exports.UserLoginComponent = UserLoginComponent;
//# sourceMappingURL=user-login.component.js.map