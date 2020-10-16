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
    public class OrderController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/<OrderController>
        [HttpGet]
        public async Task<IEnumerable<Order>> Get()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public async Task<Order> Get(int id)
        {
            return await _context.Orders.Where(c => c.OrderId == id).FirstOrDefaultAsync();
        }

        // POST api/<OrderController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbOrder = _context.Orders.SingleOrDefault(p => p.OrderId == id);

            if (dbOrder == null)
                return NotFound();

            _context.Orders.Remove(dbOrder);
            await _context.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 No
        }
    }
}
