using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using Webshop.Controllers;
using Webshop.Data;
using Xunit;

namespace WebshopTest.UnitTest
{
    public class TestCartController
    {
        private CartController cartController;
        private ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> _userManager;


        public TestCartController()
        {
            _context = new ApplicationDbContext();
            cartController = new CartController(_context, _mapper, _userManager);
        }

        [Fact]
        public async void GetAll()
        {
            var result = await cartController.Get();

            Assert.IsType<CartDto>(result);
        }
    }
}
