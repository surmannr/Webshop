using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webshop.Data
{
    public class User : IdentityUser
    {

       

        //Egy User-nek lehet több review-ja is termékekről.        
        public List<Review> Reviews { get; set; }

        //Egy User-nek van egy kosara        
        public Cart Cart { get; set; }

       
    }
}