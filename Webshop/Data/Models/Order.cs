using System;
using System.Collections.Generic;


namespace Webshop.Data
{
    public class Order
    {
        /// <summary>
        /// A rendelést létrehozó felhasználó azonosítója
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// A rendeléshez tartozó fizetési mód neve
        /// </summary>
        public string PaymentMetod { get; set; }

        /// <summary>
        /// A rendeléshez tartozó kiszállítási opció neve
        /// </summary>
        public string ShippingMethod { get; set; }


        /// <summary>
        /// A rendelés létrehozásának időpontja
        /// </summary>
        public DateTime orderTime { get; set; }

        /// <summary>
        /// A rendelés státuszának egyéni azonosítója
        /// </summary>
        public int StatusId { get; set; }

        /// <summary>
        /// A rendelés státuszának objektuma
        /// </summary>
        public Status Status { get; set; }

        /// <summary>
        /// A megrendelés egyéni azonosítója
        /// </summary>
        public int OrderId { get; set; }

        /// <summary>
        /// A rendelés több terméket is tartalmazhat
        /// </summary>
        public List<OrderItem> orderItems { get; set; }

        
    }
}
