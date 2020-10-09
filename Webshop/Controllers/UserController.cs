using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webshop.Data;

namespace Webshop.Controllers
{
    [Produces("application/json")]
    [Route("/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }
        // Felhasználó CRUD
        /// <summary>
        /// Kitöröl egy adott felhasználót.
        /// </summary>
        /// <param name="id"></param>        
        [HttpDelete("/[controller]/del/{id}")]
        public IActionResult Delete(string id)
        {
            var todo = _context.Users.Find(id);

            if (todo == null)
            {
                return NotFound();
            }

            _context.Users.Remove(todo);
            _context.SaveChanges();

            return NoContent();
        }
        /// <summary>
        /// Felhasználó létrehozása.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "name": "Melvin",
        ///        "password": "SDSD535FDF32GAS",
        ///        "email": "melvinakalandor@gmail.com"
        ///     }
        ///
        /// </remarks>
        /// <param name="item"></param>
        /// <returns>A newly created User</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPost("/[controller]/new")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<User> Create(User item)
        {
            _context.Users.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetNewUser", new { id = item.Id }, item);
        }
        /// <summary>
        /// Felhasználó frissítése.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "name": "Melvin",
        ///        "password": "SDSD535FDF32GAS",
        ///        "email": "melvinakalandor@gmail.com"
        ///     }
        ///
        /// </remarks>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns>A newly created User</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response>            
        [HttpPut("/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Update(string id, User user)
        {
            var item = _context.Users.Find(id);

            if (item == null)
            {
                return NotFound();
            }
            

            _context.Entry(item).CurrentValues.SetValues(user);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
