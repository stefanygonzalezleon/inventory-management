using Microsoft.EntityFrameworkCore;
using Model;

namespace dbContext
{
    public class DBContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
