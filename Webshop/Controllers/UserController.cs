using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webshop.Data;

namespace Webshop.Controllers
{
    [Produces("application/json")]
    [Route("/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet("/[controller]/{userid}")]
        public async Task<User> GetUser(string userid)
        {
            var item = await _context.Users.Where(c => c.Id == userid).FirstOrDefaultAsync();           
            return item;
        }
        
        [HttpGet("/[controller]")]
        public async Task<List<User>> GetCarts()
        {

            //var item = await _context.carts.select(d);
            //var test = await _context.carts.where(i => i.cartid != null).tolist();
            return await _context.Users.ToListAsync();
        }


        // Felhasználó CRUD
        /// <summary>
        /// Kitöröl egy adott felhasználót.
        /// </summary>
        /// <param name="id"></param>        
        [HttpDelete("/[controller]/del/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            //var item = await _context.Users.FindAsync(id);
            var item = await _context.Users.Where(c => c.Id == id).FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }

            _context.Users.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        /// <summary>
        /// Felhasználó létrehozása.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "name": "Melvin",
        ///        "password": "SDSD535FDF32GAS",
        ///        "email": "melvinakalandor@gmail.com"
        ///     }
        ///
        /// </remarks>
        /// <param name="item"></param>
        /// <returns>A newly created User</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPost("/[controller]/new")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Create(User item)
        {
            if(item != null)
            {
                _context.Users.Add(item);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("/[controller]");
        }
        /// <summary>
        /// Felhasználó frissítése.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "name": "Melvin",
        ///        "password": "SDSD535FDF32GAS",
        ///        "email": "melvinakalandor@gmail.com"
        ///     }
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns>A newly created User</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPut("/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(string id, UserDto user)
        {
            var item = await _context.Users.Where(c => c.Id == id).FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }
            //User destination = MyMapper.myMapper<User, UserDto>(ref user);
            var destination = new User(cart: user.Cart, _Username: user.Username, _Email: user.Email, _Id: user.Id);
            
            _context.Entry(item).CurrentValues.SetValues(destination);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
