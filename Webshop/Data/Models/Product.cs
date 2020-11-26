using Microsoft.AspNetCore.Http;
using System.Collections.Generic;


namespace Webshop.Data
{
    public class Product
    {
        /// <summary>
        /// A termék neve
        /// </summary>
        public string Product_Name { get; set; }

        /// <summary>
        /// A termék ára
        /// </summary>
        public int Price { get; set; }

        /// <summary>
        /// A termék egyéni azonosítója
        /// </summary>
        public int ProductID { get; set; }

        /// <summary>
        /// A termékhez tartozó termékleírás
        /// </summary>
        public string Product_Description { get; set; }

        /// <summary>
        /// A termék kiszállítási ára
        /// </summary>
        public int Shipping_Price { get; set; }


        /// <summary>
        /// A termék kategóriájának egyéni azonosítója
        /// </summary>
        public int CategoryId { get; set; }

        /// <summary>
        /// A termék kategóriájának objektuma
        /// </summary>
        public Category Category { get; set; }

        /// <summary>
        /// Egy termék több kosárba is tartozhat.
        /// Ez az adattag a termék kosár összerendeléseket tartalmazza.
        /// </summary>
        public List<ProductCart> ProductCart { get; set; }

        /// <summary>
        /// A termék beszállítójának egyéni azonosítója
        /// </summary>
        public int SupplierId { get; set; }

        /// <summary>
        /// A termék beszállítójának objektuma
        /// </summary>
        public Supplier Supplier { get; set; }

        /// <summary>
        /// Egy termékhez tartozó felhasználói visszajelzéseket tartalmazza
        /// </summary>
        public List<Review> Reviews { get; set; } = new List<Review>();

        /// <summary>
        /// A termékhez tartozó kép neve
        /// </summary>
        public string ImageName { get; set; }
    }
}