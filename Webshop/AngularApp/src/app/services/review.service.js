"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var BaseUrl_1 = require("../services/BaseUrl");
var operators_1 = require("rxjs/operators");
var ReviewService = /** @class */ (function () {
    function ReviewService(http) {
        this.http = http;
    }
    ReviewService.prototype.handleError = function (error) {
        return rxjs_1.throwError(error);
    };
    /**
     * @description - Az adatbázisban tárolt összes felhasználói visszajelzést kérdezi le.
     * @returns Observable<Review[]> - A backend által visszaadott felhasználói visszajelzések tömbje
     * */
    ReviewService.prototype.getAll = function () {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + 'Review');
    };
    /**
     * @description - Az adatbázisban tárolt felhasználói visszajelzések közül id alapján kérdez le
     * @param id - Az azonosítója annak a terméknek aminek felhasználói visszajelzéseit le kell kérni
     * @returns Observable<Review[]> - A termékhez tartozó visszajelzések tömbje
     */
    ReviewService.prototype.get = function (id) {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + 'Review/' + id).pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - Egy új visszajelzést hoz létre
     * @param data - Tartalmazza az adatokat amiből majd a backend létrehozza a visszajelzést
     */
    ReviewService.prototype.create = function (data) {
        return this.http.post(BaseUrl_1.BASEURL.baseUrl + 'Review', data).pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - Egy visszajelzés adatait módosítja
     * @param id - A visszajelzés azonosítója amit a backend-nek módosítani kell
     * @param data - Tartalmazza a módosításhoz szükséges adatokat
     */
    ReviewService.prototype.update = function (id, data) {
        return this.http.put(BaseUrl_1.BASEURL.baseUrl + 'Review/' + id, data).pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - Egy felhasználói visszajelzést töröl az adatbázisból
     * @param id - Az azonosítója a visszajelzésnek amit a backend-nek törölnie kell
     */
    ReviewService.prototype.delete = function (id) {
        return this.http.delete(BaseUrl_1.BASEURL.baseUrl + 'Review/' + id).pipe(operators_1.catchError(this.handleError));
    };
    ReviewService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ReviewService);
    return ReviewService;
}());
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map