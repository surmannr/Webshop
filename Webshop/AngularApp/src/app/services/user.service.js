"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var BaseUrl_1 = require("../services/BaseUrl");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var UserService = /** @class */ (function () {
    function UserService(http, fb, router) {
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.avatarImageRoute = "https://localhost:44308/Resources/Images/avatar.png";
        this.formModel = this.fb.group({
            UserName: ['', forms_1.Validators.required],
            Email: ['', forms_1.Validators.email],
            Passwords: this.fb.group({
                Password: ['', forms_1.Validators.required],
                ConfirmPassword: ['', forms_1.Validators.required]
            }, { validator: this.comparePasswords })
        });
    }
    UserService.prototype.comparePasswords = function (fb) {
        var confirmPasswordControl = fb.get('ConfirmPassword');
        if (confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors) {
            if (fb.get('Password').value != confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ passwordMismatch: true });
            }
            else {
                confirmPasswordControl.setErrors(null);
            }
        }
    };
    /**
     * @description - A backend-nek elküldi a bejelentkezési adatokat
     * @param formData - A bejelentkezéshez szükséges adatokat tartalmazza
     */
    UserService.prototype.login = function (formData) {
        return this.http.post(BaseUrl_1.BASEURL.baseUrl + "User/Login", formData).pipe(operators_1.catchError(this.handleError));
    };
    /**
     *@description - A bejelentkezett felhasználói profilt kéri le a backend-től
     * */
    UserService.prototype.getUserProfile = function () {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + "UserProfile").pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - Ellenőrzi, hogy a bejelentkezett felhasználó szerepköre megfelel-e az elvártaknak
     * @param allowedRoles - A szükséges role-ok
     */
    UserService.prototype.roleMatch = function (allowedRoles) {
        var isMatch = false;
        //Dekódoljuk a payload-ot
        try {
            var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        }
        catch (err) {
            localStorage.removeItem('token');
            this.router.navigate(['login']);
        }
        var userRole = payload.role;
        //Végigmegyünk a role-okon és megnézzük megvan-e a user-nek
        allowedRoles.forEach(function (element) {
            if (userRole == element) {
                isMatch = true;
                return false;
            }
        });
        return isMatch;
    };
    UserService.prototype.handleError = function (error) {
        return rxjs_1.throwError(error);
    };
    /**
    * @description - Az összes adatbázisban szereplő felhasználó lekérése
    * @returns Observable<User[]> - Az adatbázisban tárolt összes felhasználó tömbje
    */
    UserService.prototype.getAll = function () {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + 'User');
    };
    /**
     * @description - Az adatbázisban tárolt felhasználók id alapján történő lekérése
     * @param id - A felhasználó azonosítója akit le kell kérni
     * @returns Observable<User> - A backend által visszadott felhasználó
     */
    UserService.prototype.get = function (id) {
        return this.http.get(BaseUrl_1.BASEURL.baseUrl + 'User/' + id).pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - Egy felhasználó létrehozása
     * @param data - Tartalmazza az adatokat amik a létrehozáshoz szükségesek
     */
    UserService.prototype.create = function (data) {
        return this.http.post(BaseUrl_1.BASEURL.baseUrl + 'User', data).pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - Egy felhasználó adatait módosítja
     * @param id - Az azonosítója a módosítandó felhasználónak
     * @param data - Tartalmazza az adatokat a módosításhoz
     */
    UserService.prototype.update = function (id, data) {
        return this.http.put(BaseUrl_1.BASEURL.baseUrl + 'User/' + id, data).pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - Az adatbázisból töröl egy felhasználót
     * @param id - Az azonosítója a törlendő felhasználónak
     */
    UserService.prototype.delete = function (id) {
        return this.http.delete(BaseUrl_1.BASEURL.baseUrl + 'User/' + id).pipe(operators_1.catchError(this.handleError));
    };
    /**
     * @description - Egy admin felhasználó létrehozása
     * @param data - Tartalmazza az adatokat egy admin létrehozásához
     */
    UserService.prototype.createAdmin = function (data) {
        return this.http.post(BaseUrl_1.BASEURL.baseUrl + 'User/registerAdmin', data).pipe(operators_1.catchError(this.handleError));
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map