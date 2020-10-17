using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;
using ApplicationDbContext = Webshop.Data.ApplicationDbContext;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> _userManager;
        //private readonly UserManager<User> _userManager;

        public UserController(ApplicationDbContext context, IMapper mapper, Microsoft.AspNetCore.Identity.UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<IEnumerable<UserDto>> Get()
        {
            var res = await _context.Users.ToListAsync();
            var mappelt = _mapper.Map<List<UserDto>>(res);
            return mappelt;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserDto> Get(string id)
        {
            var res = await _context.Users.Where(c => c.Id == id).FirstOrDefaultAsync();
            var mappelt = _mapper.Map<UserDto>(res);
            return mappelt;
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserDto newUser)
        {
            var user = _mapper.Map<User>(newUser);
            var result = await _userManager.CreateAsync(user);

            if (result.Succeeded)
            {
                result = await _userManager.AddToRoleAsync(user, "User");           
            }           
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] UserDto newUser)
        {

            var user = _mapper.Map<User>(newUser);
            var userWaitingForUpdate = _context.Users.SingleOrDefault(p => p.Id == id);

            if (userWaitingForUpdate == null)
                return NotFound();

            // modositasok elvegzese           
            userWaitingForUpdate.UserName = user.UserName;
            userWaitingForUpdate.Email = user.Email;



            // mentes az adatbazisban
            await _context.SaveChangesAsync();

            return NoContent(); // 204 NoContent valasz
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var dbUser = _context.Users.SingleOrDefault(p => p.Id == id);
            
            if (dbUser == null)
                return NotFound();

            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 No
        }
    }
}
