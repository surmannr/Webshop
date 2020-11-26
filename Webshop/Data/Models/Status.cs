using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webshop.Data
{
    public class Status
    {
        public Status(int i)
        {
            switch (i)
            {
                case 1:
                    {
                        Name = "New";
                        break;
                    }
                case 2: 
                    {
                        Name = "Processing";
                        break;
                    }
                case 3: 
                    {
                        Name = "Packaged";
                        break;
                    }
                case 4:
                    {
                        Name = "In transit";
                        break;
                    }
                case 5:
                    {
                        Name = "Delivered";
                        break;
                    }
                default:
                    {
                        Name = "Error";
                        break;
                    }
            }
           
        }
        public Status() {; }
       

        /// <summary>
        /// A sztátusz egyéni azonosítója
        /// </summary>
        public int StatusId { get; set; }

        /// <summary>
        /// A sztátusz neve
        /// </summary>
        public string Name { get; set; }
    }
}
