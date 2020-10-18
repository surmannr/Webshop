using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Webshop.Data
{
    public class CartDto
    {
        //Tárolt adatok
        public int CartId { get; set; }
        public string UserId { get; set; }

        public string User { get; set; }

        public List<int> ProductsID { get; set; } = new List<int>();
    }
}
