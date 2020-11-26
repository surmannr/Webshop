using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Webshop.Data
{
    public class User : IdentityUser
    {

       

        /// <summary>
        /// A felhasználó visszajelzései az egyes termékekről
        /// </summary>        
        public List<Review> Reviews { get; set; }

        /// <summary>
        /// A felhasználó kosara
        /// </summary>        
        public Cart Cart { get; set; }

        /// <summary>
        /// A felhasználó szerepköre
        /// </summary>
       public string Role { get; set; }
    }
}