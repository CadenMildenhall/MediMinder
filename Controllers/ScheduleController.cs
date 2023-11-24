






using System.Threading.Tasks;
using System.Data.Common;
using MediMinder.Data;
using MediMinder.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

[ApiController]
[Route("api/[controller]")]
public class ScheduleController : ControllerBase
{
    private MediMinderDbContext _dbContext;

    public ScheduleController(MediMinderDbContext context)
    {
        _dbContext = context;
    }

[HttpGet]
public IActionResult Get()
{
    return Ok(_dbContext.Schedule);
}


[HttpPost]
public IActionResult Add([FromBody] Schedule schedule)
{
    try
    {
        // Validate the incoming schedule object
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Add the new schedule entry to the database
        _dbContext.Schedule.Add(schedule);
        _dbContext.SaveChanges();

        // Return the created schedule entry ID
        return CreatedAtAction(nameof(Get), new { id = schedule.Id }, schedule.Id);
    }
    catch (Exception ex)
    {
        // Log the exception or handle it appropriately
        return StatusCode(500, "Internal Server Error");
    }
}



}
