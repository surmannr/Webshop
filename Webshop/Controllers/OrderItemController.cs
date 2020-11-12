using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity.UI.V3.Pages.Internal.Account.Manage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> _userManager;
        public OrderItemController(ApplicationDbContext context, IMapper mapper, Microsoft.AspNetCore.Identity.UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }
        // GET: api/<ProductCartController>
        [HttpGet]
        public async Task<List<OrderItemDto>> Get()
        {
            var res = await _context.OrderItems.ToListAsync();
            var mappelt = _mapper.Map<List<OrderItemDto>>(res);
            return mappelt;
        }

        // GET api/<ProductCartController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderItemDto>> Get(int id)
        {
            var res = await _context.OrderItems.Where(c => c.OrderItemId == id).FirstOrDefaultAsync();
            if (res == null) return NotFound();
            var mappelt = _mapper.Map<OrderItemDto>(res);
            return mappelt;
        }
        
        
        [HttpGet("getByOrderId/{orderId}")]         
        public async Task<ActionResult<List<OrderItemDto>>> GetByOrderId(int orderId)
        {
            var res = await _context.OrderItems.Where(c => c.OrderId == orderId).ToListAsync();
            if (res == null) return null;
            var mappelt = _mapper.Map<List<OrderItemDto>>(res);
            return mappelt;
        }





        // POST api/<ProductCartController>
        [HttpPost]
        public async Task<ActionResult> Post(int id, [FromBody] OrderItemDto oinew)
        {
            OrderItem oi = _mapper.Map<OrderItem>(oinew);

            var orderIdCheck = _context.Orders.Where(p => p.OrderId == oinew.OrderId);
            var productIdCheck = _context.Products.Where(p => p.ProductID == oinew.ProductID);

            if (orderIdCheck == null)
            {
                return NotFound();
            }
            if (productIdCheck == null)
            {
                return NotFound();
            }
            // Mivel új dolog, ezért instant 1 lesz.
            oi.StatusId = 1;

            _context.OrderItems.Add(oi);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // PUT api/<ProductCartController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] OrderItemDto oinew)
        {

            var oiWaitingForUpdate = _context.OrderItems.SingleOrDefault(p => p.OrderItemId == id);

            if (oiWaitingForUpdate == null)
                return NotFound();

            // modositasok elvegzese
            if (oinew.Amount != 0)
            {
                oiWaitingForUpdate.Amount = oinew.Amount;
            }
            if (oinew.StatusId != 0)
            {
                oiWaitingForUpdate.StatusId = oinew.StatusId;
            }
            // mentes az adatbazisban
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE api/<ProductCartController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbOrderItem = _context.OrderItems.SingleOrDefault(p => p.OrderItemId == id);

            if (dbOrderItem == null)
                return NotFound();

            _context.OrderItems.Remove(dbOrderItem);
            await _context.SaveChangesAsync();
            
            return Ok();
        }
    }
}
