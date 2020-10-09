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
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }
        // Kategória CRUD
        /// <summary>
        /// Kitöröl egy adott kategóriát.
        /// </summary>
        /// <param name="id"></param>        
        [HttpDelete("/[controller]/del/{id}")]
        public IActionResult Delete(int id)
        {
            var todo = _context.Categories.Find(id);

            if (todo == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(todo);
            _context.SaveChanges();

            return NoContent();
        }
           /// <summary>
           /// Felhasználó létrehozása.
           /// </summary>
           /// <remarks>
           /// Sample request:
           ///
           ///     POST /Todo
           ///     {
           ///        "id": 1,
           ///        "name": "karora"
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
           public ActionResult<Category> Create(Category item)
           {
               _context.Categories.Add(item);
               _context.SaveChanges();

               return CreatedAtRoute("GetNewCategory", new { id = item.CategoryId }, item);
           }
           /// <summary>
           /// Kategória frissítése.
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
           /// <param name="category"></param>
           /// <returns>A newly created Category</returns>
           /// <response code="201">Returns the newly created item</response>
           /// <response code="400">If the item is null</response>            
           [HttpPut("/[controller]/{id}")]
           [ProducesResponseType(StatusCodes.Status201Created)]
           [ProducesResponseType(StatusCodes.Status400BadRequest)]
           public IActionResult Update(int id, Category category)
           {
               var item = _context.Categories.Find(id);

               if (item == null)
               {
                   return NotFound();
               }


               _context.Entry(item).CurrentValues.SetValues(category);
               _context.SaveChanges();

               return NoContent();
           }
    }
}
