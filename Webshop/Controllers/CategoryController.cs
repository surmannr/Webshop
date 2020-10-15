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
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Categories.Where(c => c.CategoryId == id).FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(item);
            await _context.SaveChangesAsync();

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
           public async Task<ActionResult> Create(CategoryDto item)
           {
            if  (item != null) {

                Category destination = MyMapper.myMapper<Category, CategoryDto>(ref item);

                _context.Categories.Add(destination);
               await _context.SaveChangesAsync();
            }

             return RedirectToAction("/[controller]"); 
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
           public async Task<IActionResult> Update(int id, CategoryDto category)
           {
                 var item = await _context.Categories.Where(c => c.CategoryId == id).FirstOrDefaultAsync();

            if (item == null)
               {
                   return NotFound();
               }
            Category destination = MyMapper.myMapper<Category, CategoryDto>(ref category);

            _context.Entry(item).CurrentValues.SetValues(destination);
               await  _context.SaveChangesAsync();

               return NoContent();
           }
    }
}
