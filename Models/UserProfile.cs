

using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace MediMinder.Models;

public class UserProfile
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }

    [NotMapped] // not mapped means that EF Core won't create column for this property in the db
    public string Email { get; set; }
    [NotMapped]
    public string UserName { get; set; }
    public string? IdentityUserId { get; set; }
    public IdentityUser? IdentityUser { get; set; }
}