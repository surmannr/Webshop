using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Webshop.Data;

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> _userManager;

        public UserProfileController(Microsoft.AspNetCore.Identity.UserManager<User> userManager) {
            _userManager = userManager;
        }
        [HttpGet]
        [Authorize]
        public async Task<Object> GetUserProfile() {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            Debug.WriteLine(userId);
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.UserName,
                user.Email,  
                user.Id
            };
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
