using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Webshop.Data;
using Xunit;

namespace ControllerTests
{

    public class Test 
    {
       
        private  IMapper _mapper;
        private  UserManager<User> _userManager;
        private  Webshop.Controllers.CartController _cartController;      
        private Webshop.Controllers.SupplierController _supplierController;
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


        private async Task SetUp(ApplicationDbContext context) {
            _mapper = new Mock<IMapper>().Object;
            _userManager = MockUserManager(new List<User>()).Object;

            //Seeding with test data
            await  context.Carts.AddAsync(new Cart() { CartId = 1});
            await  context.Carts.AddAsync(new Cart() { CartId = 2});
            await context.Categories.AddAsync(new Category() { CategoryId = 1, Category_Name = "testName1"});
            await context.Categories.AddAsync(new Category() { CategoryId = 2, Category_Name = "testName2"});
            await context.Suppliers.AddAsync(new Supplier() { SupplierId = 1, Address = "testAddress1", Multiplier = 1, Name = "testName1", Products = { } });
            await context.Suppliers.AddAsync(new Supplier() { SupplierId = 2, Address = "testAddress2", Multiplier = 2, Name = "testName2", Products = { } });
            await context.SaveChangesAsync();
        }



     

        [Fact]
        public async void Cart_Test_ShouldReturnTwoCarts() {

            using (var context = new ApplicationDbContext(CreateNewContextOptions()))
            {               
                await SetUp(context);
                
                _cartController = new Mock<Webshop.Controllers.CartController>(context, _mapper, _userManager).Object;

                List<CartDto> cartDtos = (List<CartDto>)await _cartController.Get();
                Assert.Equal(2, cartDtos.Count);
            }

        }

        [Fact]
        public async void Cart_Test_ShouldReturnCartWithIdOne() {
            using (var context = new ApplicationDbContext(CreateNewContextOptions()))
            {
                await SetUp(context);

                _cartController = new Mock<Webshop.Controllers.CartController>(context, _mapper, _userManager).Object;

                var cartDtoFromController =  await _cartController.Get(1);

                Assert.NotNull(cartDtoFromController);
            }
        }

        [Fact]
        public async void Cart_Test_ShouldThrowAnArgumentNullException()
        {
            using (var context = new ApplicationDbContext(CreateNewContextOptions()))
            {
                await SetUp(context);

                _cartController = new Mock<Webshop.Controllers.CartController>(context, _mapper, _userManager).Object;

                var ex = Assert.ThrowsAsync<ArgumentNullException>(() => _cartController.Get(3));                
               
            }
        }


        [Fact]
        public async void Supplier_Test_ShouldReturnTwoSuppliers() {
            using (var context = new ApplicationDbContext(CreateNewContextOptions()))
            {
                await SetUp(context);

                _supplierController = new Mock<Webshop.Controllers.SupplierController>(context, _mapper).Object;

                List<SupplierDto> supplierDtos = (List<SupplierDto>)await _supplierController.Get();
                Assert.Equal(2, supplierDtos.Count);
            }
        }

       

    }
}
