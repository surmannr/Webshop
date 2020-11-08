using System.ComponentModel.DataAnnotations;

namespace Webshop.Data
{
    public class ProductCart
    {
        
        public int ProductCartId { get; set; }
       
        
        public int productIndex { get; set; }        
        public Product Product { get; set; }
        public int cartIndex { get; set; }
        public Cart Cart { get; set; }

        public int price { get; set; }
        public int quantity { get; set; }
        public string product_Name { get; set; }


    }
}