using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;


namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

     
        private List<string> paymentMethodList = new List<string> { "none", "transfer in advance", "online credit card", "cash on delivery" };
        private List<string> shippingMethodList = new List<string> { "none", "delivery courier", "delivery by post", "amazon drone" };


        public OrderController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;       
           
        }


        // GET: api/<OrderController>
        [HttpGet]
        public async Task<List<OrderDto>> Get()
        {
            var res = await _context.Orders.ToListAsync();
            var orderitems = await _context.OrderItems.Where(o => o.OrderId != 0).ToListAsync();
            List<OrderDto> retDto = new List<OrderDto>();
            foreach (Order o in res)
            {
                o.Status = await _context.Status.Where(s => s.StatusId == o.StatusId).FirstOrDefaultAsync();
                var seged = _mapper.Map<OrderDto>(o);
                foreach (OrderItem rev in orderitems)
                {
                    if (o.OrderId == rev.OrderId) seged.orderItemsID.Add(rev.OrderItemId);
                }           
                retDto.Add(seged);
            }

            return retDto;
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> Get(int id)
        {
            var res = await _context.Orders.Where(c => c.OrderId == id).FirstOrDefaultAsync();
            var orderitems = await _context.OrderItems.Where(o => o.OrderId != 0).ToListAsync();

            if (res == null) return NotFound("Couldnt find the item");

            res.Status = await _context.Status.Where(s => s.StatusId == res.StatusId).FirstOrDefaultAsync();

            var retDto = _mapper.Map<OrderDto>(res);
            foreach (OrderItem rev in orderitems)
            {
                if (res.OrderId == rev.OrderId) retDto.orderItemsID.Add(rev.OrderItemId);
            }   
            return retDto;
        }

        // POST api/<OrderController>
        [HttpPost]
        public async Task<ActionResult<int>> Post([FromBody] OrderDto newOrderDto)
        {
          
            try
            {
                var newOrder = _mapper.Map<Order>(newOrderDto);
                if (newOrder.UserId == null || newOrder.UserId == "") return BadRequest("Select a user!");
                if (!paymentMethodList.Contains(newOrder.PaymentMetod)) return BadRequest("Paymentmethod is not valid");
                if (!shippingMethodList.Contains(newOrder.ShippingMethod)) return BadRequest("Shippingmenthod is not valid");
                newOrder.StatusId = 1;

                var status = await _context.Status.Where(s => s.StatusId == newOrder.StatusId).FirstOrDefaultAsync();              
                newOrder.Status = status;

                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();


                return newOrder.OrderId;
            }
            catch (Exception)
            {
                return BadRequest("Database error during saving");
            }
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] OrderDto newOrderDto)
        {
            try
            {

                var newOrder = _mapper.Map<Order>(newOrderDto);
                var orderWaitingForUpdate = _context.Orders.SingleOrDefault(p => p.OrderId == id);

                if (orderWaitingForUpdate != null)
                {

                    var status = await _context.Status.Where(s => s.Name == newOrderDto.StatusName).FirstOrDefaultAsync();

                    if (newOrder.PaymentMetod != null) {
                        if (!paymentMethodList.Contains(newOrder.PaymentMetod)) return BadRequest("Paymentmethod is not valid");
                        else orderWaitingForUpdate.PaymentMetod = newOrder.PaymentMetod;
                    } 

                    if (newOrder.ShippingMethod != null) {
                        if (!shippingMethodList.Contains(newOrder.ShippingMethod)) return BadRequest("Shippingmenthod is not valid");
                        else orderWaitingForUpdate.ShippingMethod = newOrder.ShippingMethod;
                    } 

                    if (newOrder.Status != null) orderWaitingForUpdate.Status = status;

                    if (newOrder.StatusId != 0) orderWaitingForUpdate.StatusId = status.StatusId;

                }
                else return NoContent();

                // mentes az adatbazisban
                await _context.SaveChangesAsync();

                return Ok(); 
            }
            catch (Exception)
            {
                return BadRequest("Database error during saving");
            }
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbOrder = _context.Orders.SingleOrDefault(p => p.OrderId == id);

            if (dbOrder == null)
                return NotFound("Couldnt find the item");

            _context.Orders.Remove(dbOrder);
            await _context.SaveChangesAsync();

            return Ok(); 
        }
    }
}