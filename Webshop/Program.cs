using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Webshop.Data;

namespace Webshop
{
#pragma warning disable CS1591
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            DbContextOptions<ApplicationDbContext> options = new DbContextOptions<ApplicationDbContext>();
             using (var db = new ApplicationDbContext(options))
            {

                //Create
                Console.WriteLine("Új termék létrehozása\n");
                db.Products.Add(new Product { Price = 15, ProductID = 1, Product_Name = "okosora", Product_Description = "mukodhet" });
                db.SaveChanges();

                // Read
                Console.WriteLine("Termékek olvasása");
                var product = db.Products
                    .OrderBy(b => b.ProductID)
                    .First();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

    }
#pragma warning restore CS1591
}
