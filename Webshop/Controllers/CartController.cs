using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
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
            var res = await _context.Carts.ToListAsync();
            var products = await _context.ProductCarts.Where(c => c.cartIndex!=0).ToListAsync();
            List<CartDto> cartList = new List<CartDto>();
            //public SortedSet<int> ProductsID { get; set; }
            foreach (Cart c in res)
            {

                var user = await _userManager.FindByIdAsync(c.UserId);
                var mapppelt = _mapper.Map<CartDto>(c);
                foreach (ProductCart rev in products)
                {
                    if (c.CartId == rev.cartIndex) mapppelt.ProductsID.Add(rev.productIndex);
                }
                cartList.Add(mapppelt);
            }

            return cartList;

        }

        // GET api/<CartController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartDto>> Get(int id)
        {
            var res = await _context.Carts.Where(c => c.CartId == id).FirstOrDefaultAsync();

            // Hibakezelés
            if (res == null) return NotFound();

            var products = await _context.ProductCarts.Where(p=>p.cartIndex == id).ToListAsync();
            var user = await _userManager.FindByIdAsync(res.UserId);
            var mapppelt = _mapper.Map<CartDto>(res);

            foreach (ProductCart rev in products)
            {
                if (res.CartId == rev.cartIndex) mapppelt.ProductsID.Add(rev.productIndex);
            }
            return mapppelt;
        }
        
    }
}