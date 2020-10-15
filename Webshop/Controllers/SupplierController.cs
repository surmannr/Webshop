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
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Suppliers.Where(c => c.SupplierId == id).FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }

            _context.Suppliers.Remove(item);
            await _context.SaveChangesAsync();

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
        /// <param name="supplier"></param>
        /// <returns>A newly created Supplier</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPost("/[controller]/new")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Create(SupplierDto supplier)
        {
            if(supplier != null)
            {
                Supplier destination = MyMapper.myMapper<Supplier, SupplierDto>(ref supplier);
                _context.Suppliers.Add(destination);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction("/[controller]");
            //return CreatedAtRoute("GetNewSupplier", new { id = item.SupplierId }, item);
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
        /// <param name="supplier"></param>
        /// <returns>A newly created Supplier</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPut("/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, SupplierDto supplier)
        {
            var item = await _context.Suppliers.Where(c => c.SupplierId == id).FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }

            Supplier destination = MyMapper.myMapper<Supplier, SupplierDto>(ref supplier);

            _context.Entry(item).CurrentValues.SetValues(destination);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
