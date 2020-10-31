using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webshop.Data
{
    public class OrderDto
    {
        //Tárolt adatok
        public string UserId { get; set; }

        public string PaymentMetod { get; set; }

        public string ShippingMethod { get; set; }

        public DateTime orderTime { get; set; }

     //   public int StatusId { get; set; }
        public string StatusName { get; set; }
     //   public string kiVette { get; set; }
        public int OrderId { get; set; }

        public List<int> orderItemsID { get; set; } = new List<int>();


    }
}
