using MediMinder.Data;
using MediMinder.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class MedicineDosageController : ControllerBase
{
    private readonly MediMinderDbContext _dbContext;

    public MedicineDosageController(MediMinderDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    public IActionResult Create([FromBody] MedicineDosage medicineDosage)
    {
        try
        {
            // Validate the incoming medicineDosage object
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the Schedule to associate with
            var existingSchedule = _dbContext.Schedule.FirstOrDefault(s => s.Id == medicineDosage.Schedule.Id);

            if (existingSchedule == null)
            {
                return NotFound("Associated Schedule not found");
            }

            // Associate the MedicineDosage with the Schedule
            medicineDosage.Schedule = existingSchedule;

            // Add the new medicineDosage entry to the database
            _dbContext.MedicineDosages.Add(medicineDosage);
            _dbContext.SaveChanges();

            // Return the created medicineDosage entry ID
            return CreatedAtAction(nameof(Get), new { id = medicineDosage.Id }, medicineDosage.Id);
        }
        catch (Exception ex)
        {
            // Log the exception or handle it appropriately
            return StatusCode(500, "Internal Server Error");
        }
    }

    // Add other actions if needed

    // For example, to get all medicineDosages
    [HttpGet]
    public IActionResult Get()
    {
        var medicineDosages = _dbContext.MedicineDosages
            .Include(md => md.Schedule)
            .ToList();

        return Ok(medicineDosages);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var medicineDosage = _dbContext.MedicineDosages
            .Include(md => md.Schedule)
            .FirstOrDefault(md => md.Id == id);

        if (medicineDosage == null)
        {
            return NotFound();
        }

        return Ok(medicineDosage);
    }
}



