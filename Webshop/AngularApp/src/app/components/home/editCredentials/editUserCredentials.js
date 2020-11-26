"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserCredentials = void 0;
var core_1 = require("@angular/core");
var EditUserCredentials = /** @class */ (function () {
    function EditUserCredentials(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
        this.avatarImageRoute = this.service.avatarImageRoute;
    }
    EditUserCredentials.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getUserProfile().subscribe(function (res) {
            _this.userDetails = res;
        }, function (err) {
            _this.toastr.error(err, "Error");
        });
        this.swap_enabled_username = true;
        this.swap_enabled_email = true;
    };
    EditUserCredentials.prototype.updateUser = function () {
        var _this = this;
        var data;
        data = { id: this.userDetails.id, username: this.username, email: this.email, password: this.password };
        this.service.update(this.userDetails.id, data).subscribe(function (res) { _this.router.navigateByUrl(""); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    EditUserCredentials.prototype.swapToValueFromPlaceHolder_username = function () {
        if (this.swap_enabled_username) {
            this.username = this.userDetails.username;
            this.swap_enabled_username = !this.swap_enabled_username;
        }
    };
    EditUserCredentials.prototype.swapToValueFromPlaceHolder_email = function () {
        if (this.swap_enabled_email) {
            this.email = this.userDetails.email;
            this.swap_enabled_email = !this.swap_enabled_email;
        }
    };
    EditUserCredentials.prototype.cancelClicked = function () {
        this.router.navigateByUrl("");
    };
    __decorate([
        core_1.Input()
    ], EditUserCredentials.prototype, "user", void 0);
    EditUserCredentials = __decorate([
        core_1.Component({
            selector: 'app-editUserCredentials',
            templateUrl: './editUserCredentials.html',
            styleUrls: ['./editUserCredentials.css']
        })
    ], EditUserCredentials);
    return EditUserCredentials;
}());
exports.EditUserCredentials = EditUserCredentials;
//# sourceMappingURL=editUserCredentials.js.map