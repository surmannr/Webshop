using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CartController>
        [HttpGet]
        public async Task<IEnumerable<Cart>> Get()
        {
            return await _context.Carts.ToListAsync();
        }

        // GET api/<CartController>/5
        [HttpGet("{id}")]
        public async Task<Cart> Get(int id)
        {
            return await _context.Carts.Where(c => c.CartId == id).FirstOrDefaultAsync();

        }

        // POST api/<CartController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CartDto newCart)
        {
            var dbCart = new Cart()
            {
                User = newCart.User,
                UserForeignKey = newCart.UserForeignKey,
                ProductCart = newCart.ProductCart
             };

            _context.Carts.Add(dbCart);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT api/<CartController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] CartDto newCart)
        {
            if (id != newCart.CartId)
                return BadRequest();

            var dbCart = _context.Carts.SingleOrDefault(p => p.CartId == id);

            if (dbCart == null)
                return NotFound();

            // modositasok elvegzese
            dbCart.ProductCart = newCart.ProductCart;
            dbCart.User = newCart.User;
            dbCart.UserForeignKey = newCart.UserForeignKey;


            // mentes az adatbazisban
            await _context.SaveChangesAsync();

            return NoContent(); // 204 NoContent valasz
        }

        // DELETE api/<CartController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbCart = _context.Carts.SingleOrDefault(p => p.CartId == id);

            if (dbCart == null)
                return NotFound();

            _context.Carts.Remove(dbCart);
            await _context.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 No
        }
    }
}
