

using MediMinder.Data;
using MediMinder.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MedicineDosageController : ControllerBase
{
    private MediMinderDbContext _dbContext;

    public MedicineDosageController(MediMinderDbContext context)
    {
        _dbContext = context;
    }

[HttpGet]
public IActionResult Get()
{
    return Ok(_dbContext.MedicineDosages);
}

[HttpPost]
public IActionResult Add([FromBody] MedicineDosage medicineDosage)
{
    // Check if the association already exists
    var existingMedicineDosage = _dbContext.MedicineDosages
        .SingleOrDefault(md => md.MedicineId == medicineDosage.MedicineId && md.DosageId == medicineDosage.DosageId);

    if (existingMedicineDosage != null)
    {
        return Conflict("MedicineDosage already exists");
    }

    // Create and add the new MedicineDosage
    _dbContext.MedicineDosages.Add(medicineDosage);
    _dbContext.SaveChanges();

    string GetDay()
    {
        // Get the current day of the week (e.g., Monday, Tuesday, etc.)
        string day = DateTime.Now.DayOfWeek.ToString();
        return day;
    }

    // Example method to get the current time
    DateTime GetTime()
    {
        // Get the current time
        DateTime time = DateTime.Now;
        return time;
    }

    // Create a new Schedule entry
    var schedule = new Schedule
    {
        Day = GetDay(), // You need to replace this with the actual day
        Time = GetTime(), // Replace this with the actual time
        MedicineDosages = new List<MedicineDosage> { medicineDosage }
    };

    _dbContext.Schedule.Add(schedule);
    _dbContext.SaveChanges();

    return CreatedAtAction(nameof(Get), new { id = medicineDosage.Id }, medicineDosage);
}

}






