using System;
using System.Collections.Generic;
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
            List<OrderDto> retDto = new List<OrderDto>();
            foreach (Order o in res)
            {
                o.Status = await _context.Status.Where(s => s.StatusId == o.StatusId).FirstOrDefaultAsync();
                var seged = _mapper.Map<OrderDto>(o);
                var kiVette = await _context.Users.Where(c => c.Id == o.UserId).FirstOrDefaultAsync();
                seged.kiVette = kiVette.UserName;
                retDto.Add(seged);
            }

            return retDto;
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public async Task<OrderDto> Get(int id)
        {
            var res = await _context.Orders.Where(c => c.OrderId == id).FirstOrDefaultAsync();

            if (res == null) return null;

            res.Status = await _context.Status.Where(s => s.StatusId == res.StatusId).FirstOrDefaultAsync();

            var retDto = _mapper.Map<OrderDto>(res);
            var kiVette = await _context.Users.Where(c => c.Id == res.UserId).FirstOrDefaultAsync();
            retDto.kiVette = kiVette.UserName;

            return retDto;
        }

        // POST api/<OrderController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] OrderDto newOrderDto)
        {
            var newOrder = _mapper.Map<Order>(newOrderDto);
            newOrder.StatusId = 1;

            var status = await _context.Status.Where(s => s.StatusId == newOrder.StatusId).FirstOrDefaultAsync();
            System.Diagnostics.Debug.WriteLine(status.Name);
            newOrder.Status = status;

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] OrderDto newOrderDto)
        {
            var newOrder = _mapper.Map<Order>(newOrderDto);
            var orderWaitingForUpdate = _context.Orders.SingleOrDefault(p => p.OrderId == id);

            if (orderWaitingForUpdate != null)
            {

                var status = await _context.Status.Where(s => s.Name == newOrderDto.StatusName).FirstOrDefaultAsync();

                if (newOrder.PaymentMetod != null) orderWaitingForUpdate.PaymentMetod = newOrder.PaymentMetod;

                if (newOrder.ShippingMethod != null) orderWaitingForUpdate.ShippingMethod = newOrder.ShippingMethod;

                if (newOrder.orderTime != null) orderWaitingForUpdate.orderTime = newOrder.orderTime;

                if (newOrder.Status != null) orderWaitingForUpdate.Status = status;

                if (newOrder.StatusId != 0) orderWaitingForUpdate.StatusId = status.StatusId;

            }

            // mentes az adatbazisban
            await _context.SaveChangesAsync();

            return NoContent(); // 204 NoContent valasz
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var dbOrder = _context.Orders.SingleOrDefault(p => p.OrderId == id);

            if (dbOrder == null)
                return NotFound();

            _context.Orders.Remove(dbOrder);
            await _context.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 No
        }
    }
}