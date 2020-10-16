using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;
using ApplicationDbContext = Webshop.Data.ApplicationDbContext;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        //private readonly UserManager<User> _userManager;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await _context.Users.ToListAsync();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<User> Get(string id)
        {
            return await _context.Users.Where(c => c.Id == id).FirstOrDefaultAsync();
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserDto model)
        {
            //var user = new UserDto { Username = model.Username, Email = model.Email, Cart = new Cart()};
            //var newUser = await _userManager.CreateAsync(user, model.Password);
            
            var dbCart = _context.Carts.FirstOrDefault(v => v.CartId == model.Cart.CartId);
            if (dbCart == null)
                dbCart = new Cart();
            var dbUser = new User()
            {
                UserName = model.Username,
                Email = model.Email,
                Cart = dbCart
            };

            _context.Users.Add(dbUser);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] UserDto newUser)
        {
            if (id != newUser.Id)
                return BadRequest();

            var dbUser = _context.Users.SingleOrDefault(p => p.Id == id);

            if (dbUser == null)
                return NotFound();

            // modositasok elvegzese
            dbUser.UserName = newUser.Username;
            dbUser.Email = newUser.Email;


            // mentes az adatbazisban
            await _context.SaveChangesAsync();

            return NoContent(); // 204 NoContent valasz
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var dbUser = _context.Users.SingleOrDefault(p => p.Id == id);
            
            if (dbUser == null)
                return NotFound();

            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 No
        }
    }
}
