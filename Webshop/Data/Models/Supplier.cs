using System.Collections.Generic;

namespace Webshop.Data
{
    public class Supplier
    {
        /// <summary>
        /// A beszállító egyéni azonosítója
        /// </summary>
        public int SupplierId { get; set; }

        /// <summary>
        /// A beszállító neve
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// A beszállító címe
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// A beszállítói szorzó
        /// </summary>
        public int Multiplier { get; set; }

        /// <summary>
        /// A beszállítótól kapott termékek
        /// </summary>
        public List<Product> Products { get; set; }
    }
}