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
    public class ReviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewController(ApplicationDbContext context)
        {
            _context = context;
        }
        // Értékelés CRUD
        /// <summary>
        /// Kitöröl egy adott értékelést.
        /// </summary>
        /// <param name="id"></param>        
        [HttpDelete("/[controller]/del/{id}")]
        public IActionResult Delete(int id)
        {
            var todo = _context.Reviews.Find(id);

            if (todo == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(todo);
            _context.SaveChanges();

            return NoContent();
        }
        /// <summary>
        /// Értékelést létrehozása.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "description": "hat ez elegge gagyi",
        ///        "star": 2
        ///     }
        ///
        /// </remarks>
        /// <param name="item"></param>
        /// <returns>A newly created Category</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPost("/[controller]/new")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Review> Create(Review item)
        {
            _context.Reviews.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetNewCategory", new { id = item.ReviewId }, item);
        }
        /// <summary>
        /// Értékelés frissítése.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "name": "zsebora"
        ///     }
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="review"></param>
        /// <returns>A newly created Category</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPut("/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Update(int id, Review review)
        {
            var item = _context.Reviews.Find(id);

            if (item == null)
            {
                return NotFound();
            }


            _context.Entry(item).CurrentValues.SetValues(review);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
