using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webshop.Data.Models
{
    public class LoginModel
    {
        /// <summary>
        /// A bejelentkezéshez használt felhasználónév
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// A bejelentkezéshez használt jelszó
        /// </summary>
        public string Password { get; set; }
    }
}
