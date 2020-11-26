using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Webshop.Data.Models
{
    public class UsersFavouriteProducts
    {
        /// <summary>
        /// A felhasználó kedvenc termékének egyéni azonosítója
        /// </summary>
        public int Id { get; set; }
        
        /// <summary>
        /// A felhasználó egyéni azonosítója
        /// </summary>
        public string UserIndex { get; set; }
       
        /// <summary>
        /// A termék egyéni azonosítója
        /// </summary>
        public int ProductIndex { get; set; }
    }
}
