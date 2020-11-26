using System.Collections.Generic;

namespace Webshop.Data
{
    public class Category
    {
       /// <summary>
       /// A kategória neve
       /// </summary>
        public string Category_Name { get; set; }

        /// <summary>
        /// A kategória egyéni azonosítója
        /// </summary>
        public int CategoryId { get; set; }

        /// <summary>
        /// A kategóriába tartozó termékek.
        /// </summary>
        public List<Product> Products { get; set; }

        /// <summary>
        /// A kategóriához tartozó kép neve
        /// </summary>
        public string ImageName { get; set; }
    }
}