using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;
using Webshop.Data.DTO;
using Webshop.Data.Models;

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFavouriteProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserFavouriteProductsController(ApplicationDbContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;          
        }

       
        [HttpGet("{userId}")]
        public async Task<IEnumerable<UsersFavouriteProductsDto>> Get(string userId)
        {
            var res = await _context.UsersFavouriteProducts.Where(x => x.UserIndex == userId).ToListAsync();
            var mappelt = _mapper.Map<List<UsersFavouriteProductsDto>>(res);
            return mappelt;
        }

        
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UsersFavouriteProductsDto usersFavouriteProductsDto)
        {
            if (usersFavouriteProductsDto.UserIndex == null ||usersFavouriteProductsDto.ProductIndex == null) return NoContent();
            var newUsersFavouriteProducts = _mapper.Map<UsersFavouriteProducts>(usersFavouriteProductsDto);
            var tmp = _context.UsersFavouriteProducts.Where(x => x.ProductIndex == newUsersFavouriteProducts.ProductIndex).ToListAsync();
            if(tmp.Result.Count == 0) _context.UsersFavouriteProducts.Add(newUsersFavouriteProducts);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbUsersFavouriteProducts = _context.UsersFavouriteProducts.SingleOrDefault(p => p.Id == id);

            if (dbUsersFavouriteProducts == null)
                return NotFound("Couldnt find the item");

            _context.UsersFavouriteProducts.Remove(dbUsersFavouriteProducts);
            await _context.SaveChangesAsync();

            return Ok(); // a sikeres torlest 204 No
        }
    }
}
