using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webshop.Data
{
    public class User : IdentityUser
    {

        /* public virtual ICollection<UserClaim> Claims { get; set; }
         public virtual ICollection<UserLogin> Logins { get; set; }
         public virtual ICollection<UserToken> Tokens { get; set; }*/

        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public string UserId { get; set; }

        //Egy User-nek lehet több review-ja is termékekről.        
        public List<Review> Reviews { get; set; }

        //Egy User-nek van egy kosara        
        public Cart Cart { get; set; }
    }
}