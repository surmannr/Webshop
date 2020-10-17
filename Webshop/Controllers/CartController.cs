using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> _userManager;
        public CartController(ApplicationDbContext context, IMapper mapper, Microsoft.AspNetCore.Identity.UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        // GET: api/<CartController>
        [HttpGet]
        public async Task<IEnumerable<CartDto>> Get()
        {
            var res =  await _context.Carts.ToListAsync();

            List<CartDto> cartList = new List<CartDto>();

            foreach (Cart c in res) {
                var user = await _userManager.FindByIdAsync(c.UserId);
                var mapppelt = _mapper.Map<CartDto>(c);               
                cartList.Add(mapppelt);
            }
            
            return cartList;
        }

        // GET api/<CartController>/5
        [HttpGet("{id}")]
        public async Task<CartDto> Get(int id)
        {
            var res = await _context.Carts.Where(c => c.CartId == id).FirstOrDefaultAsync();

            var user = await _userManager.FindByIdAsync(res.UserId);

            var mapppelt = _mapper.Map<CartDto>(res);

         
           
            return mapppelt;
        }

        // POST api/<CartController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CartDto newCartDto)
        {

            var user = await _userManager.FindByIdAsync(newCartDto.UserId);   

            Cart cart = new Cart();

            cart.User = user;            
            

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT api/<CartController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] CartDto newCartDto)
        {


            var user = await _userManager.FindByIdAsync(newCartDto.UserId);


            if (user != null)
            {
                var cartWaitingForUpdate = _context.Carts.SingleOrDefault(p => p.CartId == id);
                cartWaitingForUpdate.User = user;
            }
            
           

            // mentes az adatbazisban
            await _context.SaveChangesAsync();

            return NoContent(); // 204 NoContent valasz
        }

        // DELETE api/<CartController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbCart = _context.Carts.SingleOrDefault(p => p.CartId == id);

            if (dbCart == null)
                return NotFound();

            _context.Carts.Remove(dbCart);
            await _context.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 No
        }
    }
}
