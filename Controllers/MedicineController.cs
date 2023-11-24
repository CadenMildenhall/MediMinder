

using System.Security.Cryptography;
using System.Data.Common;
using System.Security.Claims;
using MediMinder.Data;
using MediMinder.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

[ApiController]
[Route("api/[controller]")]
public class MedicineController : ControllerBase
{
    private MediMinderDbContext _dbContext;

    public MedicineController(MediMinderDbContext context)
    {
        _dbContext = context;
    }

[HttpGet]
public IActionResult Get()
{
    return Ok(_dbContext.Medicine);
}
    }

