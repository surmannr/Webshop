"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var user_favourite_products_service_1 = require("./user-favourite-products.service");
describe('UserFavouriteProductsService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(user_favourite_products_service_1.UserFavouriteProductsService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=user-favourite-products.service.spec.js.map