using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Webshop.Data.Models
{
    public class UsersFavouriteProducts
    {
        public int Id { get; set; }
        
        public string UserIndex { get; set; }
       
        public int ProductIndex { get; set; }
    }
}
