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
       

        public ProductController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;  
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
            }

            return productList;
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> Get(int id)
        {
            var res = await _context.Products.FirstOrDefaultAsync(p => p.ProductID == id);
            if (res == null) return NotFound("Couldnt find the item");

            var reviews = await _context.Reviews.Where(r => r.ProductId == res.ProductID).ToListAsync();

            var mapppelt = _mapper.Map<ProductDto>(res);
            foreach (Review rev in reviews)
            {
                if (res.ProductID == rev.ProductId) mapppelt.ReviewsID.Add(rev.ReviewId);
            }
            return mapppelt;
        }


        // GET api/<ProductController>/5
        [HttpGet("FilterByCategoryIdAndProductName/{categoryIdForFiltering,ProductNameForFiltering}")]
        public async Task<IEnumerable<ProductDto>> GetByCategoryIdAndProductName(int categoryIdForFiltering, string ProductNameForFiltering)
        {
            List<Product> res;
            if(categoryIdForFiltering == -1)
                 res = await _context.Products.Where(p => p.Product_Name.Contains(ProductNameForFiltering)).ToListAsync();

            else if(ProductNameForFiltering == null)
                res = await _context.Products.Where(p => p.CategoryId == categoryIdForFiltering).ToListAsync();

            else if(ProductNameForFiltering.Length == 0)
                res = await _context.Products.Where(p => p.CategoryId == categoryIdForFiltering).ToListAsync();

            else
                res = await _context.Products.Where(p => p.CategoryId == categoryIdForFiltering && p.Product_Name.Contains(ProductNameForFiltering)).ToListAsync();
           
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
            }

            return productList;
        }




        // POST api/<ProductController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ProductDto newProduct)
        {
            try
            {
                Product product = _mapper.Map<Product>(newProduct);
                if (product.Product_Name == null) return BadRequest("Enter a valid product name");
                if (product.Price == 0) return BadRequest("Enter a valid price");
                if (product.Shipping_Price == 0) return BadRequest("Enter a valid shipping price");

                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(418, ex.Message);
            }
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ProductDto newProduct)
        {
            try
            {
                var productWaitingForUpdate = await _context.Products.FirstOrDefaultAsync(r => r.ProductID == id);               
                if (productWaitingForUpdate == null) return NotFound();

                if (newProduct.Price > 0) productWaitingForUpdate.Price = newProduct.Price;
                if (newProduct.Product_Description != null) productWaitingForUpdate.Product_Description = newProduct.Product_Description;
                if (newProduct.Product_Name != null) productWaitingForUpdate.Product_Name = newProduct.Product_Name;
                if (newProduct.CategoryId != 0) productWaitingForUpdate.CategoryId = newProduct.CategoryId;
                if (newProduct.Shipping_Price > 0) productWaitingForUpdate.Shipping_Price = newProduct.Shipping_Price;
                if (newProduct.SupplierId != 0) productWaitingForUpdate.SupplierId = newProduct.SupplierId;
                if (newProduct.ImageName != null) productWaitingForUpdate.ImageName = newProduct.ImageName;
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(418, ex.Message);
            }
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbProduct = _context.Products.SingleOrDefault(p => p.ProductID == id);

            if (dbProduct == null)
                return NotFound("Couldnt find the item");

            _context.Products.Remove(dbProduct);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
