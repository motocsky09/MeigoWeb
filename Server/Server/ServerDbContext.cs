using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Entities;

namespace Server
{
    public class ServerDbContext : DbContext
    {
        public ServerDbContext(DbContextOptions<ServerDbContext> options) : base(options) 
        { 
        }
        public DbSet<Category> Category { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderHistoryByUser> OrderHistoryByUser { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductAddedShCart> ProductAddedShCart { get; set; }
        public DbSet<ShoppingCart> ShoppingCart { get; set; }
        public DbSet<User> User { get; set; }
    }
}
