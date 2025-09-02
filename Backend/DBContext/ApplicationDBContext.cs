using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using API.Model;
using Backend.Model;

namespace API.DBContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }


        public DbSet<User> Users { get; set; }
        public DbSet<TokenModel> TokenModels { get; set; }
        public DbSet<SystemSetting> SystemSetting { get; set; }
        public DbSet<ChatModel> ChatModels { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<GateModel>().Property(e => e.CreatedDate)
            // .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            // // Adding the code below tells DB "NumericId is an AlternateKey and don't update".
            // // modelBuilder.Entity<CertificateModel>().Property(e => e.applicationNo)
            // // .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            modelBuilder.Entity<SystemSetting>()
                .Property(e => e.IMAmount)
                .HasPrecision(18, 4); // e.g., 18 total digits, 4 after decimal

            modelBuilder.Entity<SystemSetting>()
                .Property(e => e.MOCAmount)
                .HasPrecision(18, 4);

            modelBuilder.Entity<SystemSetting>()
                .Property(e => e.OnlineFees)
                .HasPrecision(18, 4);
        }
    }
}
