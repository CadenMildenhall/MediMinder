

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MediMinder.Models;
using Microsoft.AspNetCore.Identity;

namespace MediMinder.Data;
public class MediMinderDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    
    public DbSet<Medicine> Medicine { get; set; }

    public DbSet<Schedule> Schedule { get; set; }

    public MediMinderDbContext(DbContextOptions<MediMinderDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        // {
        //     Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
        //     Name = "Admin",
        //     NormalizedName = "admin"
        // });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
        {
            new IdentityUser{
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser{
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5s",
            UserName = "caden",
            Email = "milde@nhall.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
        });

        // modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        // {
        //     RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
        //     UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        // });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
        {
        
        new UserProfile{
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        },
            new UserProfile{
            Id = 2,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5s",
            FirstName = "caden",
            LastName = "mildenhall",
            Address = "202 Main Street",
        },
        });

//////////////////////////////////////////////////


      
          modelBuilder.Entity<Medicine>().HasData(new Medicine[] //?
        {

        });

//////////

      modelBuilder.Entity<Schedule>().HasData(new Schedule[] //?
        {

        });

    }

    
    
}