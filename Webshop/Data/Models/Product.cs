using Microsoft.AspNetCore.Http;
using System.Collections.Generic;


namespace Webshop.Data
{
    public class Product
    {
        //Tárolt adatok
        public string Product_Name { get; set; }
        public int Price { get; set; }
        public int ProductID { get; set; }
        public string Product_Description { get; set; }
        public int Shipping_Price { get; set; }


        //Egy termék egy kategóriához tartozik
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        // Egy termék tartozhat egy kosárhoz
        public List<ProductCart> ProductCart { get; set; }

        //Egy terméket egy beszállító hozhat
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }

        //Egy terméknek több review-ja is lehet
        public List<Review> Reviews { get; set; } = new List<Review>();

        public string ImageName { get; set; }
    }
}