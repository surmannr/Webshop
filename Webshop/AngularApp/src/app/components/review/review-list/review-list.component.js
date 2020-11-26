"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewListComponent = void 0;
var core_1 = require("@angular/core");
var ReviewListComponent = /** @class */ (function () {
    function ReviewListComponent(service) {
        this.service = service;
        this.ReviewList = [];
        this.ActivateAddEditRevComp = false;
    }
    ;
    ReviewListComponent.prototype.ngOnInit = function () {
        this.refreshRevList();
    };
    ReviewListComponent.prototype.refreshRevList = function () {
        var _this = this;
        this.service.getAll().subscribe(function (data) {
            _this.ReviewList = data;
        });
    };
    ReviewListComponent.prototype.addClick = function () {
        this.rev = {
            description: "",
            stars: 0,
            reviewId: 0,
            productId: 0,
            userId: "",
            username: "",
            emptyStarsList: [],
            starsList: []
        };
        this.ModalTitle = "Add Review";
        this.ActivateAddEditRevComp = true;
    };
    ReviewListComponent.prototype.editClick = function (item) {
        this.rev = item;
        this.ModalTitle = "Edit Review";
        this.ActivateAddEditRevComp = true;
    };
    ReviewListComponent.prototype.closeClick = function () {
        this.ActivateAddEditRevComp = false;
        this.refreshRevList();
    };
    ReviewListComponent.prototype.deleteClick = function (item) {
        var _this = this;
        if (confirm("Do you want to delete this item?")) {
            this.service.delete(item.reviewId).subscribe(function (_) {
                _this.refreshRevList();
            });
        }
    };
    ReviewListComponent = __decorate([
        core_1.Component({
            selector: 'app-review-list',
            templateUrl: './review-list.component.html',
            styleUrls: ['./review-list.component.css']
        })
    ], ReviewListComponent);
    return ReviewListComponent;
}());
exports.ReviewListComponent = ReviewListComponent;
//# sourceMappingURL=review-list.component.js.map