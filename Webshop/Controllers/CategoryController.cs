using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _mapper;
        public CategoryController(ApplicationDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<List<CategoryDto>> Get()
        {
            var res = await _context.Categories.ToListAsync();
            var mappelt =_mapper.Map<List<CategoryDto>>(res);
            return mappelt;
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> Get(int id)
        {
            var res =  await _context.Categories.Where(c => c.CategoryId == id).FirstOrDefaultAsync();

            // Hibakezelés
            if (res == null) return NotFound();

            var mappelt = _mapper.Map<CategoryDto>(res);

            return mappelt;

        }
        
        // POST api/<CategoryController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CategoryDto newCategoryDto)
        {
            try
            {
                if (newCategoryDto.Category_Name == null) return NoContent();
                var newCategory = _mapper.Map<Category>(newCategoryDto);
                _context.Categories.Add(newCategory);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(418);
            }
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] CategoryDto newCategoryDto)
        {
            try
            {
                var newCategory = _mapper.Map<Category>(newCategoryDto);
                if (newCategory == null) return NoContent();

                var categoryWaitingForUpdate = _context.Categories.SingleOrDefault(p => p.CategoryId == id);

                if (categoryWaitingForUpdate == null)
                    return NotFound();

                // modositasok elvegzese

                if (newCategory.Category_Name != null) categoryWaitingForUpdate.Category_Name = newCategory.Category_Name;
                if (newCategory.ImageName != null) categoryWaitingForUpdate.ImageName = newCategory.ImageName;
                // mentes az adatbazisban
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(418);
            }
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

            return Ok(); // a sikeres torlest 204 No
        }
    }
}
