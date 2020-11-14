using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Webshop.Data;

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;
        public UserProfileController(Microsoft.AspNetCore.Identity.UserManager<User> userManager, ApplicationDbContext context) {
            _userManager = userManager;
            _context = context;
        }
        [HttpGet]
        [Authorize]
        public async Task<Object> GetUserProfile() {
            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;

                if(userId == "" || userId == null) return BadRequest("You must log in to use this service");

                // Debug.WriteLine(userId);
                var user = await _userManager.FindByIdAsync(userId);
                var cart = await _context.Carts.FirstOrDefaultAsync(x => x.UserId == userId);
                return new
                {
                    user.UserName,
                    user.Email,
                    user.Id,
                    cart.CartId
                };
            }
            catch (Exception e) {
                return BadRequest("You must log in to use this service");
            }
        }



        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("ForAdmin")]
        public string GetForAdmin() {
            return "Web method for admin";
        }
        [HttpGet]
        [Authorize(Roles = "Customer")]
        [Route("ForCustomer")]
        public string GetForCustomer()
        {
            return "Web method for customer";
        }

        [HttpGet]
        [Authorize(Roles = "Customer,Admin")]
        [Route("ForAdminOrCustomer")]
        public string GetForAdminOrCustomer()
        {
            return "Web method for admin or customer";
        }

    }
}
