using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }
        // Kosár CRUD
        /// <summary>
        /// Kitöröl egy adott kosarat.
        /// </summary>
        /// <param name="id"></param>        
        [HttpDelete("/[controller]/{userid}/del/{id}")]
        public IActionResult Delete(int id)
        {
            var todo = _context.Carts.Find(id);

            if (todo == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(todo);
            _context.SaveChanges();

            return NoContent();
        }
        /// <summary>
        /// Kosár létrehozása.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "username": "superboi2001"
        ///     }
        ///
        /// </remarks>
        /// <param name="item"></param>
        /// <returns>A newly created Cart</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPost("/[controller]/{userid}/new")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Cart> Create(Cart item)
        {
            _context.Carts.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetNewCart", new { id = item.CartId }, item);
        }
        /// <summary>
        /// Kosár frissítése.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "username": "superboi2001"
        ///     }
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="cart"></param>
        /// <returns>A newly created Cart</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPut("/[controller]/{userid}/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Update(int id, Cart cart)
        {
            var item = _context.Suppliers.Find(id);

            if (item == null)
            {
                return NotFound();
            }


            _context.Entry(item).CurrentValues.SetValues(cart);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

