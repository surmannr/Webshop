
using System.Collections.Generic;
using Webshop.Data;

public class CategoryDto
    {
        //Tárolt adatok
        public string Category_Name { get; set; }
        public int CategoryId { get; set; }

        //Egy Category több termékhez tartozik.
        public List<Product> Products { get; set; }
    }
