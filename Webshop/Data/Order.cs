using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webshop.Data
{
    public class Order
    {
        public int UserID { get; set; }

        public string PaymentMetod { get; set; }

        public string ShippingMethod { get; set; }

        public List<OrderItem> orderItems { get; set; }

        public DateTime orderTime { get; set; }

        public Status orderStatus { get; set; }
    }
}
