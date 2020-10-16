using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewController(ApplicationDbContext context)
        {
            _context = context;
        }



        // GET: api/<ReviewController>
        [HttpGet]
        public async Task<IEnumerable<Review>> Get()
        {
            return await _context.Reviews.ToListAsync();
        }

        // GET api/<ReviewController>/5
        [HttpGet("{id}")]
        public async Task<Review> Get(int id)
        {
            return await _context.Reviews.Where(c => c.ReviewId == id).FirstOrDefaultAsync();
        }

        // POST api/<ReviewController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ReviewController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ReviewController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbReview = _context.Reviews.SingleOrDefault(p => p.ReviewId == id);

            if (dbReview == null)
                return NotFound();

            _context.Reviews.Remove(dbReview);
            await _context.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 No
        }
    }
}
