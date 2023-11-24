



using System.Data.Common;
using MediMinder.Data;
using MediMinder.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

[ApiController]
[Route("api/[controller]")]
public class DosageController : ControllerBase
{
    private MediMinderDbContext _dbContext;

    public DosageController(MediMinderDbContext context)
    {
        _dbContext = context;
    }

[HttpGet]
public IActionResult Get()
{
    return Ok(_dbContext.Dosages);
}

    }