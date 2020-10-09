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
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }
        // Order CRUD
        /// <summary>
        /// Kitöröl egy adott rendelést.
        /// </summary>
        /// <param name="id"></param>        
        [HttpDelete("/[controller]/del/{id}")]
        public IActionResult Delete(int id)
        {
            var todo = _context.Orders.Find(id);

            if (todo == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(todo);
            _context.SaveChanges();

            return NoContent();
        }
      
        /// <summary>
        /// Rendelés létrehozása.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "PaymentMetod": "Cash",
        ///        "ShippingMethod": "Via ship",
        ///        "orderTime": "2020.10.10 10:10:10",
        ///        "orderStatus": "delivered"
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
        public ActionResult<Order> Create(Order item)
        {
            _context.Orders.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetNewUser", new { id = item.OrderId }, item);
        }
        /// <summary>
        /// Rendelések frissítése.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "PaymentMetod": "CreditCard",
        ///        "ShippingMethod": "Via train",
        ///        "orderTime": "2020.10.10 10:10:10",
        ///        "orderStatus": "destroyed"
        ///     }
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="order"></param>
        /// <returns>A newly created User</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPut("/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Update(int id, Order order)
        {
            var item = _context.Orders.Find(id);

            if (item == null)
            {
                return NotFound();
            }


            _context.Entry(item).CurrentValues.SetValues(order);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
