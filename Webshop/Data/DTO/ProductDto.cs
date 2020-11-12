using System.Collections.Generic;

namespace Webshop.Data
{
    public class ProductDto
    {
        //Tárolt adatok
        public string Product_Name { get; set; }
        public int Price { get; set; }
        public int ProductID { get; set; }
        public string Product_Description { get; set; }
        public int Shipping_Price { get; set; }


        //Egy termék egy kategóriához tartozik
        public int CategoryId { get; set; }

        //Egy terméket egy beszállító hozhat
        public int SupplierId { get; set; }

        //Egy terméknek több review-ja is lehet
        public List<int> ReviewsID { get; set; } = new List<int>();

        public string ImageName { get; set; }



    }
}