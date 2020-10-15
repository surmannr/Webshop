using System.Collections.Generic;

namespace Webshop.Data
{
    public class Supplier
    {
        //Tárolt adatok
        public int SupplierId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int Multiplier { get; set; }

        // Egy beszállítóhoz több termék is tartozhat
        public List<Product> Products { get; set; }
    }
}