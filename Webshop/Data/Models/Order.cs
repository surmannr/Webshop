using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webshop.Data
{
    public class Order
    {
        //Tárolt adatok
        public string UserId { get; set; }

        public string PaymentMetod { get; set; }

        public string ShippingMethod { get; set; }

        public DateTime orderTime { get; set; }

        public Status orderStatus { get; set; }

        public int OrderId { get; set; }

        //Egy rendelés több termékből áll.
        public List<OrderItem> orderItems { get; set; }

        
    }
}
