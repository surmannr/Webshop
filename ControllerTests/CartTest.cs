using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using Webshop.Data;
using Xunit;

namespace ControllerTests
{
    
    public class CartTest 
    {
       
        private  IMapper _mapper;
        private  UserManager<User> _userManager;
        private  Webshop.Controllers.CartController _cartController;


        private  DbContextOptions<ApplicationDbContext> CreateNewContextOptions()
        {
            // Create a fresh service provider, and therefore a fresh 
            // InMemory database instance.
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            // Create a new options instance telling the context to use an
            // InMemory database and the new service provider.
            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
            builder.UseInMemoryDatabase("testDatabase")
                   .UseInternalServiceProvider(serviceProvider);

            return builder.Options;
        }

        private Mock<UserManager<TUser>> MockUserManager<TUser>(List<TUser> ls) where TUser : class
        {
            var store = new Mock<IUserStore<TUser>>();
            var mgr = new Mock<UserManager<TUser>>(store.Object, null, null, null, null, null, null, null, null);
            mgr.Object.UserValidators.Add(new UserValidator<TUser>());
            mgr.Object.PasswordValidators.Add(new PasswordValidator<TUser>());

            mgr.Setup(x => x.DeleteAsync(It.IsAny<TUser>())).ReturnsAsync(IdentityResult.Success);
            mgr.Setup(x => x.CreateAsync(It.IsAny<TUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success).Callback<TUser, string>((x, y) => ls.Add(x));
            mgr.Setup(x => x.UpdateAsync(It.IsAny<TUser>())).ReturnsAsync(IdentityResult.Success);

            return mgr;
        }


        private void SetUp(ApplicationDbContext context) {
            _mapper = new Mock<IMapper>().Object;
            _userManager = MockUserManager(new List<User>()).Object;

            //Seeding with test data
            context.Carts.Add(new Cart() { CartId = 1});
            context.Carts.Add(new Cart() { CartId = 2});
            context.SaveChanges();
        }



     

        [Fact]
        public async void ShouldReturnTwoCarts() {

            using (var context = new ApplicationDbContext(CreateNewContextOptions()))
            {               
                SetUp(context);
                
                _cartController = new Mock<Webshop.Controllers.CartController>(context, _mapper, _userManager).Object;

                List<CartDto> cartDtos = (List<CartDto>)await _cartController.Get();
                Assert.Equal(2, cartDtos.Count);
            }

        }

        [Fact]
        public async void ShouldReturnCartWithIdOne() {
            using (var context = new ApplicationDbContext(CreateNewContextOptions()))
            {
                SetUp(context);

                _cartController = new Mock<Webshop.Controllers.CartController>(context, _mapper, _userManager).Object;

                var cartDtoFromController =  await _cartController.Get(1);

                Assert.NotNull(cartDtoFromController);
            }
        }

        [Fact]
        public void ShouldThrowAnArgumentNullException()
        {
            using (var context = new ApplicationDbContext(CreateNewContextOptions()))
            {
                SetUp(context);

                _cartController = new Mock<Webshop.Controllers.CartController>(context, _mapper, _userManager).Object;

                var ex = Assert.ThrowsAsync<ArgumentNullException>(() => _cartController.Get(3));                
               
            }
        }
    }
}
