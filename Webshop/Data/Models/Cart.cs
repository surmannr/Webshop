using System.Collections;
using System.Collections.Generic;

namespace Webshop.Data
{
    public class Cart
    {
        //Tárolt adatok
        public int CartId { get; set; }

        // A kosár egy adott felhasználóhoz tartozik
       // public int UserId { get; set; }
       

        //Egy kosárba több termék is tartozik
        public List<ProductCart> ProductCart { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
    }
}
