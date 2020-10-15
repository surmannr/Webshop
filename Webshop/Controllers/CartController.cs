using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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
        
        [HttpGet("/[controller]/{userid}")]
        public async Task<Cart> GetCart(int id)
        {
            var item = await _context.Carts.Where(c => c.CartId == id).FirstOrDefaultAsync();
            return item;
        }

        [HttpGet("/[controller]/")]
        public async Task<List<Cart>> GetCarts() {
            
            //var item = await _context.carts.select(d);
            //var test = await _context.carts.where(i => i.cartid != null).tolist();
            return await _context.Carts.ToListAsync();
        }

        // Kosár CRUD
        /// <summary>
        /// Kitöröl egy adott kosarat.
        /// </summary>
        /// <param name="id"></param>        
        [HttpDelete("/[controller]/{userid}/del/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Carts.Where(c => c.CartId == id).FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }
            
            _context.Carts.Remove(item);
            await _context.SaveChangesAsync();

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
        public async Task<ActionResult> Create(CartDto item)
        {
            if  (item != null) {

               Cart destination = MyMapper.myMapper<Cart, CartDto>(ref item);

                _context.Carts.Add(destination);
                await  _context.SaveChangesAsync();
            }
            return RedirectToAction("/[controller]");
            //return CreatedAtRoute("GetNewCart",  new { id = item.CartId }, item);
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
        public async Task<IActionResult> Update(int id, CartDto cart)
        {

            var item = await _context.Carts.Where(c => c.CartId == id).FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }
            
            Cart destination = MyMapper.myMapper<Cart, CartDto>(ref cart);
            
                
                //Cart destination = CartMapper(cart);

            _context.Entry(item).CurrentValues.SetValues(destination);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        /*private static Cart CartMapper(CartDto cart)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Cart, CartDto>();
            });
            IMapper iMapper = config.CreateMapper();
            var destination = iMapper.Map<CartDto, Cart>(cart);
            return destination;
        }*/
       
    }
}

