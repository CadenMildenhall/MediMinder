
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

    public DbSet<Dosage> Dosages { get; set; }

    public DbSet<MedicineDosage> MedicineDosages { get; set; }

    public DbSet<ScheduleMedicineDosage> scheduleMedicineDosages { get; set; }

    public MediMinderDbContext(DbContextOptions<MediMinderDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

modelBuilder.Entity<ScheduleMedicineDosage>()
    .HasKey(smd => new { smd.ScheduleId, smd.MedicineDosageId });

modelBuilder.Entity<ScheduleMedicineDosage>()
    .HasOne(smd => smd.Schedule)
    .WithMany(s => s.ScheduleMedicineDosages)
    .HasForeignKey(smd => smd.ScheduleId);

modelBuilder.Entity<ScheduleMedicineDosage>()
    .HasOne(smd => smd.MedicineDosage)
    .WithMany(md => md.ScheduleMedicineDosages)
    .HasForeignKey(smd => smd.MedicineDosageId); // Use MedicineDosageId here






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

        modelBuilder.Entity<Medicine>().HasData(new Medicine[]
        {
        new Medicine
        {
            Id = 1,
            MedicineName = "Advil"
        },
        new Medicine
        {
            Id = 2,
            MedicineName = "Ibuprofin"
        },
        new Medicine
        {
            Id = 3,
            MedicineName = "Aleve"
        },
        new Medicine
        {
            Id = 4,
            MedicineName = "Claritin"
        },
        new Medicine
        {
            Id = 5,
            MedicineName = "Tylenol"
        },
        new Medicine
        {
            Id = 6,
            MedicineName = "Zyrtec"
        }
        });

        modelBuilder.Entity<Schedule>().HasData(new Schedule[]
        {
        new Schedule
        {
            Id = 1,
            Day = "Monday"
        },
                new Schedule
        {
            Id = 2,
            Day = "Tuesday"
        },
                new Schedule
        {
            Id = 3,
            Day = "Wednesday"
        },
                new Schedule
        {
            Id = 4,
            Day = "Thursday"
        },
                new Schedule
        {
            Id = 5,
            Day = "Friday"
        },
                new Schedule
        {
            Id = 6,
            Day = "Saturday"
        },
                new Schedule
        {
            Id = 7,
            Day = "Sunday"
        },
        });

        modelBuilder.Entity<Dosage>().HasData(new Dosage[]
        {
        new Dosage
        {
            Id = 1,
            Amount = 5
        },
        new Dosage
        {
            Id = 2,
            Amount = 10
        },
        new Dosage
        {
            Id = 3,
            Amount = 15
        },
        new Dosage
        {
            Id = 4,
            Amount = 20
        },
        new Dosage
        {
            Id = 5,
            Amount = 30
        },
        new Dosage
        {
            Id = 6,
            Amount = 35
        }

        });


        modelBuilder.Entity<MedicineDosage>().HasData(new MedicineDosage[]
        {
            new MedicineDosage
            {
                Id = 1,
                MedicineId = 1,
                DosageId = 1
            },
            new MedicineDosage
            {
                Id = 2,
                MedicineId = 2,
                DosageId = 2,
            },
                        new MedicineDosage
            {
                Id = 3,
                MedicineId = 3,
                DosageId = 3,
            },
                        new MedicineDosage
            {
                Id = 4,
                MedicineId = 4,
                DosageId = 4,
            },
                        new MedicineDosage
            {
                Id = 5,
                MedicineId = 5,
                DosageId = 5,
            },
                        new MedicineDosage
            {
                Id = 6,
                MedicineId = 6,
                DosageId = 6,
            }
        });


    }
}

