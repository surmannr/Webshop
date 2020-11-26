"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var BaseUrl_1 = require("../services/BaseUrl");
var operators_1 = require("rxjs/operators");
var SupplierService = /** @class */ (function () {
    function SupplierService(http) {
        this.http = http;
    }
    SupplierService.prototype.handleError = function (error) {
        return rxjs_1.throwError(error);
    };
    /**
     * @description - Az adatbázisban tárolt beszállítókat lekéri
     * @returns Observable<Supplier[]> - A backend által visszaadott beszállítók tömbje
     * */
    SupplierService.prototype.getAll = function () {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + 'Supplier');
    };
    /**
     * @description - Az adatbázisban tárolt beszállítók id alapján való lekérése
     * @param id - A beszállító egyéni azonosítója
     * @returns Observable<Supplier> - A backend által visszadott beszállító
     */
    SupplierService.prototype.get = function (id) {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + 'Supplier/' + id).pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - Egy új beszállító létrehozása
     * @param data - Tartalmazza az adatokat egy új beszállító létrehozásához
     */
    SupplierService.prototype.create = function (data) {
        return this.http.post(BaseUrl_1.BASEURL.baseUrl + 'Supplier', data).pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - Egy beszállító adatait módosítja
     * @param id - Az azonosítója a módosítandó beszállítónak
     * @param data - Tartalmazza a módosításhoz szükséges adatokat
     */
    SupplierService.prototype.update = function (id, data) {
        return this.http.put(BaseUrl_1.BASEURL.baseUrl + 'Supplier/' + id, data).pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - egy beszállítót töröl az adatbázisból
     * @param id - A törlendő beszállító azonosítója
     */
    SupplierService.prototype.delete = function (id) {
        return this.http.delete(BaseUrl_1.BASEURL.baseUrl + 'Supplier/' + id).pipe(operators_1.catchError(this.handleError));
    };
    SupplierService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SupplierService);
    return SupplierService;
}());
exports.SupplierService = SupplierService;
//# sourceMappingURL=supplier.service.js.map