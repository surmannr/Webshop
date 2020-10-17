using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webshop.Data
{
    public class Status
    {
        private int v;

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
        //Tárolt adatok
        public int StatusId { get; set; }
        public string Name { get; set; }
    }
}
