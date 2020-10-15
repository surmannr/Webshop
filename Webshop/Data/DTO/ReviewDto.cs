namespace Webshop.Data
{
    public class ReviewDto
    {
        //Tárolt adatok  
        public string Description { get; set; }
        public int Stars { get; set; }
        public int ReviewId { get; set; }


        //Egy review egy termékhez tartozik
        public int ProductId { get; set; }
        public Product Product { get; set; }

        // Egy review egy felhasználóhoz tartozik
        public string UserId { get; set; }
        public User User { get; set; }
    }
}