using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Webshop.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<ProductCart> ProductCarts { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<User>().HasKey(e => e.UserId);

            modelBuilder.Entity<User>()
                .HasOne(b => b.Cart)
                .WithOne(i => i.User)
                .HasForeignKey<Cart>(b => b.UserId);

            modelBuilder.Entity<ProductCart>()
                        .HasKey(bc => new { bc.CartId, bc.ProductId });
            modelBuilder.Entity<ProductCart>()
                        .HasOne(bc => bc.Cart)
                        .WithMany(b => b.ProductCart)
                        .HasForeignKey(bc => bc.CartId);
            modelBuilder.Entity<ProductCart>()
                        .HasOne(bc => bc.Product)
                        .WithMany(c => c.ProductCart)
                        .HasForeignKey(bc => bc.ProductId);
        }
         public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
               : base(options)
           {
           }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Server = (localdb)\mssqllocaldb; Database = WebShop; Integrated Security = True");
        }
    }
}
