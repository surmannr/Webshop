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
        public async Task<CategoryDto> Get(int id)
        {
            var res =  await _context.Categories.Where(c => c.CategoryId == id).FirstOrDefaultAsync();
            var mappelt = _mapper.Map<CategoryDto>(res);
            return mappelt;

        }
        
        // POST api/<CategoryController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CategoryDto newCategoryDto)
        {
            var newCategory = _mapper.Map<Category>(newCategoryDto);            
            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] CategoryDto newCategoryDto)
        {
            var newCategory = _mapper.Map<Category>(newCategoryDto);
       

            var categoryWaitingForUpdate = _context.Categories.SingleOrDefault(p => p.CategoryId == id);

            if (categoryWaitingForUpdate == null)
                return NotFound();

            // modositasok elvegzese
            categoryWaitingForUpdate.Category_Name = newCategory.Category_Name;

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
