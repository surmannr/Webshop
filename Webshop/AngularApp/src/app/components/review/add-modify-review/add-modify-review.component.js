"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddModifyReviewComponent = void 0;
var core_1 = require("@angular/core");
var AddModifyReviewComponent = /** @class */ (function () {
    function AddModifyReviewComponent(service, toastr) {
        this.service = service;
        this.toastr = toastr;
    }
    AddModifyReviewComponent.prototype.ngOnInit = function () {
        this.description = this.rev.description;
        this.stars = this.rev.stars;
        this.reviewId = this.rev.reviewId;
        this.productId = this.rev.productId;
        this.userId = this.rev.userId;
    };
    AddModifyReviewComponent.prototype.addReview = function () {
        var _this = this;
        var val;
        val = {
            description: this.description, stars: this.stars, productId: this.productId, userId: this.userId,
            reviewId: this.reviewId, username: "", starsList: [], emptyStarsList: []
        };
        this.service.create(val).subscribe(function (res) { alert("Added the review"); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    AddModifyReviewComponent.prototype.updateReview = function () {
        var _this = this;
        var val;
        val = {
            description: this.description, stars: this.stars, productId: this.productId, userId: this.userId,
            reviewId: this.reviewId, username: "", starsList: [], emptyStarsList: []
        };
        this.service.update(this.reviewId, val).subscribe(function (res) { alert("Updated the review"); }, function (error) {
            _this.toastr.error(error.error, "Error");
        });
    };
    __decorate([
        core_1.Input()
    ], AddModifyReviewComponent.prototype, "rev", void 0);
    AddModifyReviewComponent = __decorate([
        core_1.Component({
            selector: 'app-add-modify-review',
            templateUrl: './add-modify-review.component.html',
            styleUrls: ['./add-modify-review.component.css']
        })
    ], AddModifyReviewComponent);
    return AddModifyReviewComponent;
}());
exports.AddModifyReviewComponent = AddModifyReviewComponent;
//# sourceMappingURL=add-modify-review.component.js.map