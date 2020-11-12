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
        public async Task<List<ProductCartDto>> Get(int id)
        {
            var res = await _context.ProductCarts.Where(c => c.cartIndex == id).ToListAsync();
            if (res == null) return new List<ProductCartDto>();
            var mappelt = _mapper.Map<List<ProductCartDto>>(res);
            return mappelt;
        }

        // POST api/<ProductCartController>
        [HttpPost]
        public async Task<ActionResult> Post(int id, [FromBody] ProductCartDto pcnew)
        {
            try
            {
                ProductCart pc = _mapper.Map<ProductCart>(pcnew);

                var cartIdCheck = _context.Carts.Where(p => p.CartId == pcnew.cartIndex);
                var productIdCheck = _context.Products.Where(p => p.ProductID == pcnew.productIndex);
                if (cartIdCheck == null)
                {
                    return NoContent();
                }
                if (productIdCheck == null)
                {
                    return NoContent();
                }

                _context.ProductCarts.Add(pc);
                await _context.SaveChangesAsync();
                return Ok();
            } catch(Exception ex)
            {
                return StatusCode(418);
            }
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

            return Ok();
        }
    }
}
