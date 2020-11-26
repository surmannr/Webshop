"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var category_component_1 = require("./components/category/category/category.component");
var product_component_1 = require("./components/product/product/product.component");
var supplier_component_1 = require("./components/supplier/supplier/supplier.component");
var user_component_1 = require("./components/user/user/user.component");
var order_component_1 = require("./components/order/order/order.component");
var home_component_1 = require("./components/home/home.component");
var auth_guard_1 = require("./components/auth/auth.guard");
var forbidden_component_1 = require("./components/forbidden/forbidden.component");
var admin_component_1 = require("./components/admin/admin.component");
var login_component_1 = require("./components/login/login.component");
var register_customer_component_1 = require("./components/register-customer/register-customer.component");
var register_admin_component_1 = require("./components/register-admin/register-admin.component");
var editUserCredentials_1 = require("./components/home/editCredentials/editUserCredentials");
var add_modify_product_component_1 = require("./components/product/add-modify-product/add-modify-product.component");
var add_modify_supplier_component_1 = require("./components/supplier/add-modify-supplier/add-modify-supplier.component");
var add_modify_category_component_1 = require("./components/category/add-modify-category/add-modify-category.component");
var add_modify_user_component_1 = require("./components/user/add-modify-user/add-modify-user.component");
var add_modify_order_component_1 = require("./components/order/add-modify-order/add-modify-order.component");
var orderitem_component_1 = require("./components/orderitem/orderitem/orderitem.component");
var add_modify_orderitem_component_1 = require("./components/orderitem/add-modify-orderitem/add-modify-orderitem.component");
var main_page_component_component_1 = require("./components/main/main-page.component/main-page.component.component");
var main_products_component_1 = require("./components/main-products/main-products.component");
var single_product_component_1 = require("./components/single-product/single-product.component");
var customer_cart_component_1 = require("./components/customer-cart/customer-cart.component");
var main_favourites_component_1 = require("./components/main-favourites/main-favourites.component");
var main_products_filter_category_component_1 = require("./components/main-products-filter-category/main-products-filter-category.component");
var main_products_filter_product_name_component_1 = require("./components/main-products-filter-product-name/main-products-filter-product-name.component");
var main_products_filter_product_name_category_component_1 = require("./components/main-products-filter-product-name-category/main-products-filter-product-name-category.component");
var routes = [
    { path: 'category', component: category_component_1.CategoryComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'supplier', component: supplier_component_1.SupplierComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'user', component: user_component_1.UserComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'product', component: product_component_1.ProductComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'order', component: order_component_1.OrderComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'forbidden', component: forbidden_component_1.ForbiddenComponent },
    { path: 'admin', component: admin_component_1.AdminComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'adminRegister', component: register_admin_component_1.RegisterAdminComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_customer_component_1.RegisterCustomerComponent },
    { path: 'user/edit', component: editUserCredentials_1.EditUserCredentials, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'product/add', component: add_modify_product_component_1.AddModifyProductComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'supplier/add', component: add_modify_supplier_component_1.AddModifySupplierComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'category/add', component: add_modify_category_component_1.AddModifyCategoryComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'user/add', component: add_modify_user_component_1.AddModifyUserComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'order/add', component: add_modify_order_component_1.AddModifyOrderComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'order/orderitems', component: orderitem_component_1.OrderitemComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: 'order/orderitems/add', component: add_modify_orderitem_component_1.AddModifyOrderitemComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: '', component: main_page_component_component_1.MainPage },
    { path: 'techonomy/products/category/nofilter', component: main_products_component_1.MainProductsComponent },
    { path: 'techonomy/products/category/categoryFilter/:id', component: main_products_filter_category_component_1.MainProductsFilterCategoryComponent },
    { path: 'techonomy/products/category/productnameFilter/:name', component: main_products_filter_product_name_component_1.MainProductsFilterProductNameComponent },
    { path: 'techonomy/products/category/mixedFilter/categoryId/:id/productName/:productName', component: main_products_filter_product_name_category_component_1.MainProductsFilterProductNameCategoryComponent },
    { path: 'techonomy/products/:id', component: single_product_component_1.SingleProductComponent },
    { path: 'techonomy/cart', component: customer_cart_component_1.CustomerCartComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin', 'Customer'] } },
    { path: 'techonomy/favourites', component: main_favourites_component_1.MainFavouritesComponent, canActivate: [auth_guard_1.AuthGuard], data: { permittedRoles: ['Admin', 'Customer'] } }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map