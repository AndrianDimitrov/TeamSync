using Microsoft.EntityFrameworkCore;
using TeamSync.Data.Models;

namespace TeamSync.Data
{
    public class TeamSyncDbContext : DbContext
    {
        public TeamSyncDbContext(DbContextOptions<TeamSyncDbContext> options)
           : base(options)
        {
        }

        public DbSet<Employee>? Employees { get; set; }
        public DbSet<Company>? Companies { get; set;}
        public DbSet<Department>? Departments { get; set;}
        public DbSet<ApplicationUser>? ApplicationUsers { get; set; }
        public DbSet<SystemRole>? SystemRoles { get; set; }
        public DbSet<UserRole>? UserRoles { get; set; } 
        public DbSet<RefreshTokenInfo> RefreshTokenInfos { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>()
                .HasMany(c => c.Departments);

            modelBuilder.Entity<Department>()
                .HasMany(d => d.Employees);

        }
    }
}
