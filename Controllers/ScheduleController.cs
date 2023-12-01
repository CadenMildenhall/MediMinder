

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


  [HttpPost]
public async Task<IActionResult> Add([FromBody] Schedule schedule)
{
    try
    {
        // Validate the incoming schedule object
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Create or retrieve MedicineDosage
        var medicineDosage = await CreateOrRetrieveMedicineDosageAsync(schedule.MedicineId, schedule.DosageId);

        // Retrieve the selected day's schedule from the database
        var existingSchedule = await _dbContext.Schedule
            .Include(s => s.ScheduleMedicineDosages)
            .FirstOrDefaultAsync(s => s.Day == schedule.Day);

        // If the schedule for the selected day exists, update the dosage
        if (existingSchedule != null)
        {
            // Create a new ScheduleMedicineDosage
            var scheduleMedicineDosage = new ScheduleMedicineDosage
            {
                MedicineDosage = medicineDosage,
                Schedule = existingSchedule
            };

            // Update other properties if needed
            // existingSchedule.Time = schedule.Time;

            // Associate the new ScheduleMedicineDosage with the existingSchedule
            existingSchedule.ScheduleMedicineDosages.Add(scheduleMedicineDosage);

            // Save changes to the database
            await _dbContext.SaveChangesAsync();

            // Return the created or updated schedule entry ID
            return CreatedAtAction(nameof(Get), new { id = existingSchedule.Id }, existingSchedule.Id);
        }
        else
        {
            // If the schedule for the selected day does not exist, add a new entry
            schedule.ScheduleMedicineDosages = new List<ScheduleMedicineDosage>
            {
                new ScheduleMedicineDosage
                {
                    MedicineDosage = medicineDosage
                }
            };

            // Add the new schedule entry to the database
            _dbContext.Schedule.Add(schedule);

            // Save changes to the database
            await _dbContext.SaveChangesAsync();

            // Return the created schedule entry ID
            return CreatedAtAction(nameof(Get), new { id = schedule.Id }, schedule.Id);
        }
    }
    catch (Exception ex)
    {
        // Log the exception or handle it appropriately
        return StatusCode(500, "Internal Server Error");
    }
}


    // Other controller actions...

private async Task<MedicineDosage> CreateOrRetrieveMedicineDosageAsync(int medicineId, int dosageId)
{
    // Check if the MedicineDosage already exists
    var existingMedicineDosage = await _dbContext.MedicineDosages
        .FirstOrDefaultAsync(md => md.MedicineId == medicineId && md.DosageId == dosageId);

    if (existingMedicineDosage != null)
    {
        return existingMedicineDosage;
    }

    // If it doesn't exist, create a new MedicineDosage
    var newMedicineDosage = new MedicineDosage
    {
        MedicineId = medicineId,
        DosageId = dosageId
    };

    // Add the new MedicineDosage entry to the database
    _dbContext.MedicineDosages.Add(newMedicineDosage);

    // Save changes to the database asynchronously and await the completion
    await _dbContext.SaveChangesAsync();

    return newMedicineDosage;
}


// Add other actions if needed

// For example, to get all schedules
[HttpGet]
public IActionResult Get()
{
    var schedules = _dbContext.Schedule
        .Include(s => s.ScheduleMedicineDosages)
        .ThenInclude(smd => smd.MedicineDosage)
        .ThenInclude(md => md.Medicine)  // Include the related Medicine
        .Include(md => md.ScheduleMedicineDosages)
        .ThenInclude(smd => smd.MedicineDosage)
        .ThenInclude(d => d.Dosage)
        .Include(s => s.ScheduleMedicineDosages)
        .ThenInclude(d => d.MedicineDosage)
        .ThenInclude(t => t.Time)    // Include the related Dosage
        .ToList();

    return Ok(schedules);
}






}
