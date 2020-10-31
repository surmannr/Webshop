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
    public class ProductController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> _userManager;

        public ProductController(ApplicationDbContext context, IMapper mapper, Microsoft.AspNetCore.Identity.UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }
        
        // GET: api/<ProductController>
        [HttpGet]
        public async Task<IEnumerable<ProductDto>> Get()
        {
            var res = await _context.Products.ToListAsync();

            List<ProductDto> productList = new List<ProductDto>();

            var reviews = await _context.Reviews.ToListAsync();

            foreach (Product r in res)
            {
                var mapppelt = _mapper.Map<ProductDto>(r);
                foreach (Review rev in reviews)
                {
                    if (r.ProductID == rev.ProductId) mapppelt.ReviewsID.Add(rev.ReviewId);
                }
                productList.Add(mapppelt);
             //   System.Diagnostics.Debug.WriteLine(r.Reviews.Last().Description);
            }

            return productList;
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> Get(int id)
        {
            var res = await _context.Products.FirstOrDefaultAsync(p => p.ProductID == id);
            if (res == null) return NotFound();

            var reviews = await _context.Reviews.Where(r => r.ProductId == res.ProductID).ToListAsync();

            var mapppelt = _mapper.Map<ProductDto>(res);
            foreach (Review rev in reviews)
            {
                    if (res.ProductID == rev.ProductId) mapppelt.ReviewsID.Add(rev.ReviewId);
            }
            return mapppelt;
        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ProductDto newProduct)
        {
            Product product = _mapper.Map<Product>(newProduct);
            if (product.Product_Name == null || product.Price == 0 || product.Shipping_Price == 0) return null;
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ProductDto newProduct)
        {
            var productWaitingForUpdate = await _context.Products.FirstOrDefaultAsync(r => r.ProductID == newProduct.ProductID);
            if (productWaitingForUpdate == null) return NotFound();

            if (newProduct.Price != 0) productWaitingForUpdate.Price = newProduct.Price;
            if (newProduct.Product_Description != null) productWaitingForUpdate.Product_Description = newProduct.Product_Description;
            if (newProduct.Product_Name != null) productWaitingForUpdate.Product_Name = newProduct.Product_Name;
            if (newProduct.CategoryId != 0) productWaitingForUpdate.CategoryId = newProduct.CategoryId;
            if (newProduct.Shipping_Price != 0) productWaitingForUpdate.Shipping_Price = newProduct.Shipping_Price;
            if (newProduct.SupplierId != 0) productWaitingForUpdate.SupplierId = newProduct.SupplierId;

            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbProduct = _context.Products.SingleOrDefault(p => p.ProductID == id);

            if (dbProduct == null)
                return NotFound();

            _context.Products.Remove(dbProduct);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
