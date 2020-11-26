"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var BaseUrl_1 = require("../services/BaseUrl");
var operators_1 = require("rxjs/operators");
var CartService = /** @class */ (function () {
    function CartService(http) {
        this.http = http;
    }
    CartService.prototype.handleError = function (error) {
        return rxjs_1.throwError(error);
    };
    /**
     * @description - Az adatbázisban tárolt összes kosarat lekéri
     * @returns Obsersable<Cart[]> - A backend által visszadott összes kosár tömbje
     * */
    CartService.prototype.getAll = function () {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + 'Cart');
    };
    /**
     * @description - Az adatbázisban tárolt kosarak közül id alapján kérdez le
     * @param id - Az azonosítója annak a kosárnak amit a backend-nek meg kell keresnie
     * @return Observable<Cart> - A backend által visszadott kosár
     */
    CartService.prototype.get = function (id) {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + 'Cart/' + id).pipe(operators_1.catchError(this.handleError));
        ;
    };
    /**
     * @description - Egy új kosarat hoz létre
     * @param data - Az az adatszerkezet amiből majd a backend létrehozza a kosarat
     */
    CartService.prototype.create = function (data) {
        return this.http.post(BaseUrl_1.BASEURL.baseUrl + 'Cart', data);
    };
    /**
     * @description - Egy kosár adatait módosítja
     * @param id - Az azonosítója annak a kosárnap amit a backend-nek módosítania kell
     * @param data - Az az adatszerkezet ami a módosításhoz szükséges adatokat tartalmazza
     */
    CartService.prototype.update = function (id, data) {
        return this.http.put(BaseUrl_1.BASEURL.baseUrl + 'Cart/' + id, data);
    };
    /**
     * @description - Egy kosarat töröl ki az adatbázisból
     * @param id - Az azonosítója annak a kosárnak amit a backend-nek törölnie kell
     */
    CartService.prototype.delete = function (id) {
        return this.http.delete(BaseUrl_1.BASEURL.baseUrl + 'Cart/' + id);
    };
    CartService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map