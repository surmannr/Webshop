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
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Reviews.Where(c => c.ReviewId == id).FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(item);
            await _context.SaveChangesAsync();

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
        public async Task<ActionResult> Create(ReviewDto item)
        {
            Review destination = MyMapper.myMapper<Review, ReviewDto>(ref item);

            _context.Reviews.Add(destination);
             await _context.SaveChangesAsync();

            return RedirectToAction("/[controller]");
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
        public async Task<IActionResult> Update(int id, ReviewDto review)
        {
            var item = await _context.Reviews.Where(c => c.ReviewId == id).FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }
            Review destination = MyMapper.myMapper<Review, ReviewDto>(ref review);

            _context.Entry(item).CurrentValues.SetValues(destination);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
