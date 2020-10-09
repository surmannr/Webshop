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
    public class SupplierController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SupplierController(ApplicationDbContext context)
        {
            _context = context;
        }
        // Beszállító CRUD
        /// <summary>
        /// Kitöröl egy adott beszállítót.
        /// </summary>
        /// <param name="id"></param>        
        [HttpDelete("/[controller]/del/{id}")]
        public IActionResult Delete(int id)
        {
            var todo = _context.Suppliers.Find(id);

            if (todo == null)
            {
                return NotFound();
            }

            _context.Suppliers.Remove(todo);
            _context.SaveChanges();

            return NoContent();
        }
        /// <summary>
        /// Beszállító létrehozása.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "name": "Grandiozus Kft",
        ///        "address": "Mexikó",
        ///        "multiplier": "1.5"
        ///     }
        ///
        /// </remarks>
        /// <param name="item"></param>
        /// <returns>A newly created Supplier</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPost("/[controller]/new")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Supplier> Create(Supplier item)
        {
            _context.Suppliers.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetNewSupplier", new { id = item.SupplierId }, item);
        }
        /// <summary>
        /// Beszállító frissítése.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "name": "Grandiozus Kft",
        ///        "address": "Mexikó",
        ///        "multiplier": "1.5"
        ///     }
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="product"></param>
        /// <returns>A newly created Supplier</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPut("/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Update(int id, Supplier supplier)
        {
            var item = _context.Suppliers.Find(id);

            if (item == null)
            {
                return NotFound();
            }


            _context.Entry(item).CurrentValues.SetValues(supplier);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
