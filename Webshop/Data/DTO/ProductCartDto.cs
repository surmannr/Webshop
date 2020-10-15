namespace Webshop.Data
{
    public class ProductCartDto
    {
        public int ProductCartId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
    }
}