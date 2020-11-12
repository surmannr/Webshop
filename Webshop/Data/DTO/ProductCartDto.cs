namespace Webshop.Data
{
    public class ProductCartDto
    {
        public int ProductCartId { get; set; }
        public int productIndex { get; set; }
        public int cartIndex { get; set; }
        public int price { get; set; }
        public int quantity { get; set; }
        public string product_Name { get; set; }
    }
}