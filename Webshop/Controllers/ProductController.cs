﻿using Microsoft.AspNetCore.Http;
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
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }
        // Termék CRUD
        /// <summary>
        /// Kitöröl egy adott terméket.
        /// </summary>
        /// <param name="id"></param>        
        [HttpDelete("/[controller]/del/{id}")]
        public IActionResult Delete(int id)
        {
            var todo = _context.Products.Find(id);

            if (todo == null)
            {
                return NotFound();
            }

            _context.Products.Remove(todo);
            _context.SaveChanges();
            
            return NoContent();
        }
        /// <summary>
        /// Termék létrehozása.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "name": "Donald Kacsa okosóra",
        ///        "category": "Okosóra",
        ///        "shipping_price": "1500",
        ///        "description": "Vicces",
        ///        "supplier": "Grandiozus Kft"
        ///     }
        ///
        /// </remarks>
        /// <param name="item"></param>
        /// <returns>A newly created Product</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPost("/[controller]/new")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Product> Create(Product item)
        {
            _context.Products.Add(item);
            _context.SaveChanges();
            
            return CreatedAtRoute("GetNewProduct", new { id = item.ProductID }, item);
        }
        /// <summary>
        /// Termék frissítése.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "name": "Donald Kacsa okosóra",
        ///        "category": "Okosóra",
        ///        "shipping_price": "1500",
        ///        "description": "Vicces",
        ///        "supplier": "Grandiozus Kft"
        ///     }
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="product"></param>
        /// <returns>A newly created User</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPut("/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Update(int id, Product product)
        {
            var item = _context.Products.Find(id);

            if (item == null)
            {
                return NotFound();
            }


            _context.Entry(item).CurrentValues.SetValues(product);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
