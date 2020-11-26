"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFavouriteProductsService = void 0;
var core_1 = require("@angular/core");
var BaseUrl_1 = require("../services/BaseUrl");
var UserFavouriteProductsService = /** @class */ (function () {
    function UserFavouriteProductsService(http) {
        this.http = http;
    }
    /**
     * @description - A felhasználó kedvenc termékeinek lekérdezése felhasználói azonosító alapján
     * @param userId - A felhasználó azonosítója
     * @returns Observable<UserFavouriteProducts[]> - A felhasználó kedvenc termékeinek tömbje
     */
    UserFavouriteProductsService.prototype.Get = function (userId) {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + "UserFavouriteProducts/" + userId);
    };
    /**
     * @description - Egy új kedvenc terméket jegyez be a felhasználó
     * @param data - Tartalmazza a szükséges adatokat az új bejegyzés létrehozásához
     */
    UserFavouriteProductsService.prototype.Post = function (data) {
        return this.http.post(BaseUrl_1.BASEURL.baseUrl + 'UserFavouriteProducts', data);
    };
    /**
     * @description - A felhasználó kedvenc termékei közül töröl egy terméket
     * @param id - A törlendő termék azonosítója
     */
    UserFavouriteProductsService.prototype.Delete = function (id) {
        return this.http.delete(BaseUrl_1.BASEURL.baseUrl + 'UserFavouriteProducts/' + id);
    };
    UserFavouriteProductsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserFavouriteProductsService);
    return UserFavouriteProductsService;
}());
exports.UserFavouriteProductsService = UserFavouriteProductsService;
//# sourceMappingURL=user-favourite-products.service.js.map