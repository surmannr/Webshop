"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var BaseUrl_1 = require("../services/BaseUrl");
var operators_1 = require("rxjs/operators");
var StatusService = /** @class */ (function () {
    function StatusService(http) {
        this.http = http;
    }
    StatusService.prototype.handleError = function (error) {
        return rxjs_1.throwError(error);
    };
    /**
     * @description - Az adatbázisban tárolt státuszok közül id alapján kérdez le
     * @param id - Az azonosítója a státusznak amit a backend-nek meg kell keresnie
     * @returns Observable<Status> - A backend által visszaadott státusz
     */
    StatusService.prototype.get = function (id) {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + 'Status/' + id).pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - Az adatbázisban tárolt összes státuszt lekéri
     * @returns Observable<Status[]> - Az adatbázisban tárolt státuszok tömbje
     * */
    StatusService.prototype.getAll = function () {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + 'Status/');
    };
    StatusService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StatusService);
    return StatusService;
}());
exports.StatusService = StatusService;
//# sourceMappingURL=status.service.js.map