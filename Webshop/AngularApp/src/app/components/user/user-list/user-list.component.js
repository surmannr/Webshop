"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListComponent = void 0;
var core_1 = require("@angular/core");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
        this.UserList = [];
    }
    UserListComponent.prototype.ngOnInit = function () {
        this.refreshUserList();
    };
    UserListComponent.prototype.refreshUserList = function () {
        var _this = this;
        this.service.getAll().subscribe(function (data) {
            _this.UserList = data;
        });
    };
    UserListComponent.prototype.editClick = function (item) {
        localStorage.setItem('item', JSON.stringify(item));
        this.router.navigate(['/user/add']);
    };
    UserListComponent.prototype.deleteClick = function (item) {
        var _this = this;
        if (confirm("Do you want to delete this item?")) {
            this.service.delete(item.id).subscribe(function (_) {
                _this.refreshUserList();
            }, function (error) {
                _this.toastr.error(error.error, "Error");
            });
        }
    };
    UserListComponent.prototype.onLogout = function () {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    };
    UserListComponent.prototype.addAdmin = function () {
        this.router.navigate(['/adminRegister']);
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'app-user-list',
            templateUrl: './user-list.component.html',
            styleUrls: ['./user-list.component.css']
        })
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map