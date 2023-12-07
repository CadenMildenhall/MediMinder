using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediMinder.Data;
using MediMinder.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ScheduleController : ControllerBase
{
    private readonly MediMinderDbContext _dbContext;

    public ScheduleController(MediMinderDbContext context)
    {
        _dbContext = context;
    }

    // [HttpPost]
    // public async Task<IActionResult> Add([FromBody] Schedule schedule)
    // {
    //     try
    //     {
    //         // Validate the incoming schedule input
    //         if (!ModelState.IsValid)
    //         {
    //             return BadRequest(ModelState);
    //         }

    //         // Create or retrieve MedicineDosage
    //         var firstMedicineDosage = schedule.MedicineDosages.FirstOrDefault();

    //         if (firstMedicineDosage == null)
    //         {
    //             return BadRequest("MedicineDosages collection is empty");
    //         }

    //         var medicineDosage = await CreateOrRetrieveMedicineDosageAsync((int)firstMedicineDosage.MedicineId, (int)firstMedicineDosage.DosageId, firstMedicineDosage.Time ,(int)firstMedicineDosage.ScheduleId);

    //         // Retrieve the selected day's schedule from the database
    //         var existingSchedule = await _dbContext.Schedule
    //             .Include(s => s.MedicineDosages)
    //             .FirstOrDefaultAsync(s => s.Day == schedule.Day);

    //         // If the schedule for the selected day exists, update the dosage
    //         if (existingSchedule != null)
    //         {
    //             // Associate the new MedicineDosage with the existingSchedule
    //             existingSchedule.MedicineDosages.Add(medicineDosage);

    //             // Save changes to the database
    //             await _dbContext.SaveChangesAsync();

    //             // Return the created or updated schedule entry ID
    //             return CreatedAtAction(nameof(Get), new { id = existingSchedule.Id }, existingSchedule.Id);
    //         }
    //         else
    //         {
    //             // If the schedule for the selected day does not exist, add a new entry
    //             var newSchedule = new Schedule
    //             {
    //                 Day = existingSchedule.Day,
    //                 // MedicineDosages = new List<MedicineDosage> { medicineDosage }
    //             };

    //             // Add the new schedule entry to the database
    //             _dbContext.Schedule.Add(newSchedule);

    //             // Save changes to the database
    //             await _dbContext.SaveChangesAsync();

    //             // Return the created schedule entry ID
    //             return CreatedAtAction(nameof(Get), new { id = newSchedule.Id }, newSchedule);
    //         }
    //     }
    //     catch (Exception ex)
    //     {
    //         // Log the exception or handle it appropriately
    //         return StatusCode(500, "Internal Server Error");
    //     }
    // }

[HttpGet]
public IActionResult Get()
{
    return Ok(_dbContext.Schedule);
}
    // // Other actions...

    // private async Task<MedicineDosage> CreateOrRetrieveMedicineDosageAsync(int medicineId, int dosageId,DateTime time, int ScheduleId)
    // {
    //     var existingMedicineDosage = await _dbContext.MedicineDosages
    //         .FirstOrDefaultAsync(md => md.MedicineId == medicineId && md.DosageId == dosageId);

    //     if (existingMedicineDosage != null)
    //     {
    //         return existingMedicineDosage;
    //     }

    //     var newMedicineDosage = new MedicineDosage
    //     {
    //         MedicineId = medicineId,
    //         DosageId = dosageId,
    //         Time  = time,
    //         ScheduleId = ScheduleId
    //     };

    //     _dbContext.MedicineDosages.Add(newMedicineDosage);
    //     await _dbContext.SaveChangesAsync();

    //     return newMedicineDosage;
    // }
}
