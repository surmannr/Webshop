using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webshop.Data;

namespace Webshop.Controllers
{
    public class WebshopController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WebshopController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Kitöröl egy adott felhasználót.
        /// </summary>
        /// <param name="id"></param>        
        [HttpDelete("{id}")]
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









    }
}
