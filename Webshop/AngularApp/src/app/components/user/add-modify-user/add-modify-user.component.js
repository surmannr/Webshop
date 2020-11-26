"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddModifyUserComponent = void 0;
var core_1 = require("@angular/core");
var AddModifyUserComponent = /** @class */ (function () {
    function AddModifyUserComponent(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
        this.avatarImageRoute = this.service.avatarImageRoute;
    }
    AddModifyUserComponent.prototype.ngOnInit = function () {
        console.log("image route: " + this.avatarImageRoute);
        try {
            var _item_json = localStorage.getItem('item');
            this.item = JSON.parse(_item_json);
            localStorage.removeItem('item');
        }
        catch (err) {
            this.item = null;
        }
        this.swap_enabled_username = true;
        this.swap_enabled_email = true;
    };
    AddModifyUserComponent.prototype.addUser = function () {
        var _this = this;
        var val;
        val = { id: this.id, username: this.username, email: this.email, password: this.password };
        this.service.create(val).subscribe(function (res) { _this.router.navigate(['/user']); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    AddModifyUserComponent.prototype.updateUser = function () {
        var _this = this;
        var data;
        data = { id: this.item.id, username: this.username, email: this.email, password: this.password };
        this.service.update(data.id, data).subscribe(function (res) { _this.router.navigate(['/user']); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    AddModifyUserComponent.prototype.makeid = function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    AddModifyUserComponent.prototype.cancel = function () {
        this.router.navigate(['/user']);
    };
    AddModifyUserComponent.prototype.swapToValueFromPlaceHolder_username = function () {
        if (this.swap_enabled_username) {
            this.username = this.item.username;
            this.swap_enabled_username = !this.swap_enabled_username;
        }
    };
    AddModifyUserComponent.prototype.swapToValueFromPlaceHolder_email = function () {
        if (this.swap_enabled_email) {
            this.email = this.item.email;
            this.swap_enabled_email = !this.swap_enabled_email;
        }
    };
    __decorate([
        core_1.Input()
    ], AddModifyUserComponent.prototype, "user", void 0);
    AddModifyUserComponent = __decorate([
        core_1.Component({
            selector: 'app-add-modify-user',
            templateUrl: './add-modify-user.component.html',
            styleUrls: ['./add-modify-user.component.css']
        })
    ], AddModifyUserComponent);
    return AddModifyUserComponent;
}());
exports.AddModifyUserComponent = AddModifyUserComponent;
//# sourceMappingURL=add-modify-user.component.js.map