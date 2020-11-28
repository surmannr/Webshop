using System.Collections;
using System.Collections.Generic;

namespace Webshop.Data
{
    public class Cart
    {
        /// <summary>
        /// Az egyéni azonosítója a felhasználó kosarának
        /// </summary>
        public int CartId { get; set; }


       

        /// <summary>
        /// A felhasználó kosarában lévő termékek
        /// </summary>
        public List<ProductCart> ProductCart { get; set; }

        /// <summary>
        /// A kosárhoz tartozó felhasználó azonosítója
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// A felhasználó objektum
        /// </summary>
        public User User { get; set; }

    }
}
