﻿using System;
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
    public class ReviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> _userManager;

        public ReviewController(ApplicationDbContext context, IMapper mapper, Microsoft.AspNetCore.Identity.UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        // GET: api/<ReviewController>
        [HttpGet]
        public async Task<IEnumerable<ReviewDto>> Get()
        {
            var res = await _context.Reviews.ToListAsync();

            List<ReviewDto> reviewList = new List<ReviewDto>();

            foreach (Review r in res)
            { 
                var mapppelt = _mapper.Map<ReviewDto>(r);
                reviewList.Add(mapppelt);
            }
            
            return reviewList;
        }

        // GET api/<ReviewController>/5
        [HttpGet("{id}")]
        public async Task<ReviewDto> Get(int id)
        {
            var res = await _context.Reviews.Where(c => c.ReviewId == id).FirstOrDefaultAsync();
            var mapppelt = _mapper.Map<ReviewDto>(res);
            return mapppelt;
        }

        // POST api/<ReviewController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ReviewDto newReview)
        {
            var user = await _userManager.FindByIdAsync(newReview.UserId);
            var product = await _context.Products.FirstOrDefaultAsync(c => c.ProductID == newReview.ProductId);
            
            Review review = _mapper.Map<Review>(newReview);
            
            //review.User = user;
            //review.Product = product;
            if(product != null)review.ProductId = product.ProductID;
            
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT api/<ReviewController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ReviewDto newReview)
        {
            var reviewWaitingForUpdate = await _context.Reviews.FirstOrDefaultAsync(r => r.ReviewId == newReview.ReviewId);
            if (reviewWaitingForUpdate == null) return BadRequest();

            var user = await _userManager.FindByIdAsync(newReview.UserId);
            var product = await _context.Products.FirstOrDefaultAsync(c => c.ProductID == newReview.ProductId);

            if (user != null)
            {
                reviewWaitingForUpdate.UserId = user.Id;
            }
            if (product != null)
            {
                reviewWaitingForUpdate.ProductId = product.ProductID;
            }
            if (newReview.Stars!=0) reviewWaitingForUpdate.Stars = newReview.Stars;
            if (newReview.Description != null) reviewWaitingForUpdate.Description = newReview.Description;

            await _context.SaveChangesAsync();
            return NoContent();
        }
        // DELETE api/<ReviewController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbReview = _context.Reviews.SingleOrDefault(p => p.ReviewId == id);

            if (dbReview == null)
                return NotFound();

            _context.Reviews.Remove(dbReview);
            await _context.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 No
        }
    }
}
