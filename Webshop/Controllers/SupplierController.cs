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
    public class SupplierController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SupplierController(ApplicationDbContext context)
        {
            _context = context;
        }



        // GET: api/<SupplierController>
        [HttpGet]
        public async Task<IEnumerable<Supplier>> Get()
        {
            return await _context.Suppliers.ToListAsync();
        }

        // GET api/<SupplierController>/5
        [HttpGet("{id}")]
        public async Task<Supplier> Get(int id)
        {
            return await _context.Suppliers.Where(c => c.SupplierId == id).FirstOrDefaultAsync();
        }

        // POST api/<SupplierController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SupplierController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SupplierController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbSupplier = _context.Suppliers.SingleOrDefault(p => p.SupplierId == id);

            if (dbSupplier == null)
                return NotFound();

            _context.Suppliers.Remove(dbSupplier);
            await _context.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 No
        }
    }
}
