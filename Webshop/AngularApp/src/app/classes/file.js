"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Global_Functions = void 0;
var Global_Functions = /** @class */ (function () {
    function Global_Functions() {
    }
    Global_Functions.prototype.refreshReviewList = function (product, reviewService, toastr) {
        var counter = 0;
        var sum = 0;
        reviewService.get(product.productID).subscribe(function (reviews) {
            if (reviews.length === 0) {
                product.stars = 0;
                product.starsList = [];
                product.emptyStarsList = [];
                for (var i = 0; i < 5; i++) {
                    product.emptyStarsList.push(new Object());
                }
            }
            else {
                for (var _i = 0, reviews_1 = reviews; _i < reviews_1.length; _i++) {
                    var review = reviews_1[_i];
                    counter = counter + 1;
                    sum = sum + review.stars;
                }
                ;
                var avg = Math.ceil(sum / counter);
                product.stars = avg;
                product.starsList = [];
                product.emptyStarsList = [];
                for (var i = 0; i < avg; i++) {
                    product.starsList.push(new Object());
                }
                for (var i = 0; i < 5 - avg; i++) {
                    product.emptyStarsList.push(new Object());
                }
            }
        }, function (error) {
            toastr.error(error.error, "Error");
        });
    };
    Global_Functions.prototype.filterClicked = function (inputFieldName, selectedOption_category) {
        if (typeof inputFieldName !== 'undefined') {
            if (inputFieldName.length > 1) {
                //Had to use theese 2 conditions cause the empty input field is not undifined nor ""
                if (selectedOption_category !== 'undefined' && JSON.parse(selectedOption_category) !== -1) {
                    //There is a valid category selected and there is a name for filtering too
                    return "filterByNameAndCategory";
                }
                //There is no valid category selected for filtering but there is a name
                else
                    return "filterByName";
            }
            else {
                //There is no name for the filter
                if (selectedOption_category !== 'undefined') {
                    if (JSON.parse(selectedOption_category) !== -1) {
                        //There is a valid category for the filter
                        return "filterByCategory";
                    }
                    //The category filter's value is none and there is no name for the filer so remove the filtering property from the products
                    else
                        return "removeFilterFromProducts";
                }
            }
        }
        else if (selectedOption_category !== 'undefined') {
            //Filter by only using the category
            if (JSON.parse(selectedOption_category) !== -1) {
                //There is a valid category selected for filtering
                return "filterByCategory";
            }
            //There is no valid category selected for filtering
            else
                return "removeFilterFromProducts";
        }
    };
    Global_Functions.prototype.makeid = function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    return Global_Functions;
}());
exports.Global_Functions = Global_Functions;
//# sourceMappingURL=file.js.map