using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webshop.Data;
using Webshop.Data.DTO;
using Webshop.Data.Models;

namespace Webshop.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Cart, CartDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Review, ReviewDto>().ReverseMap();
            CreateMap<Supplier, SupplierDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<List<string>, List<string>>().ReverseMap();
            CreateMap<ProductCart, ProductCartDto>().ReverseMap();
            CreateMap<OrderItem, OrderItemDto>().ReverseMap();
            CreateMap<Status, StatusDto>().ReverseMap();
            CreateMap<UsersFavouriteProducts, UsersFavouriteProductsDto>().ReverseMap();
               
           
        }
    }
}
