using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestProject1.TestControllers
{
    public class CartController
    {
        public CartController(List<Cart>)
        {
        }

        // GET: api/<CartController>
        [HttpGet]
        public async Task<IEnumerable<CartDto>> Get()
        {
            var res = await _context.Carts.ToListAsync();
            var products = await _context.ProductCarts.Where(c => c.cartIndex != 0).ToListAsync();
            List<CartDto> cartList = new List<CartDto>();
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
            if (res == null) return NotFound("Couldnt find the item");

            var products = await _context.ProductCarts.Where(p => p.cartIndex == id).ToListAsync();
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
