using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webshop.Data
{
    public class OrderItem
    {

        //Tárolt adatok
        public int Amount { get; set; }

        public int Price { get; set; }

        public int ProductID { get; set; }

        public int OrderId { get; set; }

        public int StatusId { get; set; }

        public int OrderItemId { get; set; }
    }
}
