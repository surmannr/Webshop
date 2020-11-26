namespace Webshop.Data
{
    public class Review
    {
        /// <summary>
        /// A felhasználói visszajelzéshez tartozó szöveg
        /// </summary>        
        public string Description { get; set; }
        
        /// <summary>
        /// A felhasználói visszajelzéshez tartozó csillagok darabszáma
        /// </summary>
        public int Stars { get; set; }

        /// <summary>
        /// A felhasználói visszajelzés egyéni azonosítója
        /// </summary>
        public int ReviewId { get; set; }


        /// <summary>
        /// A termék egyéni azonosítója amihez a felhasználói visszajelzés tartozik
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// A termék objektum amihez a felhasználó visszajelzés tartozik
        /// </summary>
        public Product Product { get; set; }

        /// <summary>
        /// A felhasználó egyéni azonosítója aki ezt a felhasználói visszajelzést létrehozta
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// A felhasználó neve aki ezt a felhasználói visszajelzést létrehozta
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// A felhasználó objektum aki ezt a felhasználói visszajelzést létrehozta
        /// </summary>
        public User User { get; set; }
    }
}