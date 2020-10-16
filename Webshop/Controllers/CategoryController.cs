using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task<Category> Get(int id)
        {
            return await _context.Categories.Where(c => c.CategoryId == id).FirstOrDefaultAsync();

        }
        
        // POST api/<CategoryController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CategoryDto newCategory)
        {
            var dbCategory = new Category()
            {
                Category_Name = newCategory.Category_Name,
            };

            _context.Categories.Add(dbCategory);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] CategoryDto newCategory)
        {
            if (id != newCategory.CategoryId)
                return BadRequest();

            var dbCategory = _context.Categories.SingleOrDefault(p => p.CategoryId == id);

            if (dbCategory == null)
                return NotFound();

            // modositasok elvegzese
            dbCategory.Category_Name = newCategory.Category_Name;
            dbCategory.Products = newCategory.Products;


            // mentes az adatbazisban
            await _context.SaveChangesAsync();

            return NoContent(); // 204 NoContent valasz
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbCategory = _context.Categories.SingleOrDefault(p => p.CategoryId == id);

            if (dbCategory == null)
                return NotFound();

            _context.Categories.Remove(dbCategory);
            await _context.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 No
        }
    }
}
