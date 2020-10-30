using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webshop.Data.Models
{
    public class ApplicationSettings
    {
        public string JWT_Secret { get; set; }
        public string Client_Url { get; set; }
        public string Client_Url_Https { get; set; }
        public string Server_Url { get; set; }
    }
}
