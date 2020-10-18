using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> _userManager;
        public ProductCartController(ApplicationDbContext context, IMapper mapper, Microsoft.AspNetCore.Identity.UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }
        // GET: api/<ProductCartController>
        [HttpGet]
        public async Task<List<ProductCartDto>> Get()
        {
            var res = await _context.ProductCarts.ToListAsync();
            var mappelt = _mapper.Map<List<ProductCartDto>>(res);
            return mappelt;
        }
        
        // GET api/<ProductCartController>/5
        [HttpGet("{id}")]
        public async Task<ProductCartDto> Get(int id)
        {
            var res = await _context.ProductCarts.Where(c => c.ProductCartId == id).FirstOrDefaultAsync();
            var mappelt = _mapper.Map<ProductCartDto>(res);
            return mappelt;
        }

        // POST api/<ProductCartController>
        [HttpPost]
        public async Task<ActionResult> Post(int id, [FromBody] ProductCartDto pcnew)
        {
            ProductCart pc = _mapper.Map<ProductCart>(pcnew);

            var cartIdCheck = _context.Carts.Where(p => p.CartId == pcnew.CartId);
            var productIdCheck = _context.Products.Where(p => p.ProductID == pcnew.ProductId);
            if (cartIdCheck == null)
            {
                return BadRequest();
            }
            if (productIdCheck == null)
            {
                return BadRequest();
            }
            
            _context.ProductCarts.Add(pc);
            await _context.SaveChangesAsync();
            return NoContent(); // a sikeres torlest 204 No
        }

        // PUT api/<ProductCartController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ProductCartDto pcnew)
        {

            var pcWaitingForUpdate = _context.ProductCarts.SingleOrDefault(p => p.ProductCartId == id);

            if (pcWaitingForUpdate == null)
                return NotFound();

            // modositasok elvegzese
            if(pcnew.CartId != 0)
            {
                pcWaitingForUpdate.CartId = pcnew.CartId;
                pcWaitingForUpdate.Cart = await _context.Carts.FirstOrDefaultAsync(p => p.CartId == pcnew.CartId);
            }
            if (pcnew.ProductId != 0)
            {
                pcWaitingForUpdate.ProductId = pcnew.ProductId;
                pcWaitingForUpdate.Product = await _context.Products.FirstOrDefaultAsync(p => p.ProductID == pcnew.ProductId);
            }
            // mentes az adatbazisban
            await _context.SaveChangesAsync();

            return NoContent(); // 204 NoContent valasz
        }

        // DELETE api/<ProductCartController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbProductCart = _context.ProductCarts.SingleOrDefault(p => p.ProductCartId == id);

            if (dbProductCart == null)
                return NotFound();

            _context.ProductCarts.Remove(dbProductCart);
            await _context.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 No
        }
    }
}
