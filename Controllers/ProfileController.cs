

using MediMinder.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private MediMinderDbContext _dbContext;

    public ProfileController(MediMinderDbContext context)
    {
        _dbContext = context;
    }

[HttpGet]
// [Authorize]
public IActionResult Get()
{
    return Ok(_dbContext.UserProfiles);
}

}