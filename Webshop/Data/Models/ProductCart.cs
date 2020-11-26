using System.ComponentModel.DataAnnotations;

namespace Webshop.Data
{
    public class ProductCart
    {
        /// <summary>
        /// A Kosár-Termék kapcsolótábla egyéni azonosítója
        /// </summary>
        public int ProductCartId { get; set; }
       
        /// <summary>
        /// A kapcsolatban szereplő termék egyéni azonosítója
        /// </summary>
        public int productIndex { get; set; }   
        
        /// <summary>
        /// A kapcsolatban szereplő termék objektum
        /// </summary>
        public Product Product { get; set; }

        /// <summary>
        /// A kapcsolatban szereplő kosár egyéni azonosítója
        /// </summary>
        public int cartIndex { get; set; }

        /// <summary>
        /// A kapcsolatban szereplő kosár objektum
        /// </summary>
        public Cart Cart { get; set; }

        /// <summary>
        /// A kosárban szereplő termék ára
        /// </summary>
        public int price { get; set; }

        /// <summary>
        /// A kosárban szereplő termék darabszáma
        /// </summary>
        public int quantity { get; set; }

        /// <summary>
        /// A kosárban szereplő termék neve
        /// </summary>
        public string product_Name { get; set; }


    }
}