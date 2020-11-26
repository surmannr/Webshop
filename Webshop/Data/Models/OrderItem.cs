using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webshop.Data
{
    public class OrderItem
    {

        /// <summary>
        /// A termékből megrendelt darabszám
        /// </summary>
        public int Amount { get; set; }

        /// <summary>
        /// A megrendelt termék ára
        /// </summary>
        public int Price { get; set; }

        /// <summary>
        /// A megrendelt termék egyéni azonosítója
        /// </summary>
        public int ProductID { get; set; }

        /// <summary>
        /// A rendelés egyéni azonosítója
        /// </summary>
        public int OrderId { get; set; }

        /// <summary>
        /// A megrendelt termék sztátuszának egyéni azonosítója
        /// </summary>
        public int StatusId { get; set; }

        /// <summary>
        /// A megrendelt termék egyéni azonosítója
        /// </summary>
        public int OrderItemId { get; set; }
    }
}
