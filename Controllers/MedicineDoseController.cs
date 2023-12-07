using MediMinder.Data;
using MediMinder.Models;
// using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class MedicineDosageController : ControllerBase
{
private readonly MediMinderDbContext _dbContext;
// private readonly UserManager<UserProfile> _userManager;

public MedicineDosageController(MediMinderDbContext context)
{
    _dbContext = context;
    // _userManager = userManager;
}

   [HttpPost]
public async Task<IActionResult> Create([FromBody] MedicineDosage medicineDosage)
{
    try
    {

        // Validate the incoming request object
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }


        // Find the Medicine, Dosage, and Schedule to associate with
        var existingMedicine = _dbContext.Medicine.FirstOrDefault(m => m.MedicineName == medicineDosage.Medicine.MedicineName);
        var existingDosage = _dbContext.Dosages.FirstOrDefault(d => d.Amount == medicineDosage.Dosage.Amount);
        var existingSchedule = _dbContext.Schedule.Find(medicineDosage.ScheduleId);

        if (existingMedicine == null || existingDosage == null || existingSchedule == null)
        {
            return NotFound("Medicine, Dosage, or Schedule not found");
        }

//  var currentUser = await _userManager.GetUserAsync(User);

        // Create a new MedicineDosage with the associated entities
        var newMedicineDosage = new MedicineDosage
        {
            Time = medicineDosage.Time,
            ScheduleId = existingSchedule.Id,
            Medicine = existingMedicine,  // Associate the existing Medicine entity
            Dosage = existingDosage,  
            
            // UserProfile = currentUser    // Associate the existing Dosage entity
        };

        // Add the new medicineDosage entry to the database
        _dbContext.MedicineDosages.Add(newMedicineDosage);
        _dbContext.SaveChanges();

        // Return the created medicineDosage entry with associated medicine and dosage
        return CreatedAtAction(nameof(Get), new { id = newMedicineDosage.Id }, newMedicineDosage);
    }
    catch (Exception ex)
    {
        // Handle exceptions as needed
        Console.WriteLine($"Error creating medicine dosage: {ex.Message}");
        return StatusCode(500, "Internal Server Error");
    }
}



 [HttpGet]
public IActionResult Get()
{
    var medicineDosages = _dbContext.MedicineDosages
        .Include(md => md.Schedule)
        .Include(md => md.Medicine)
        .Include(md => md.Dosage)
        .Select(md => new
        {
            md.Id,
            md.Time,
            md.MedicineId,
            md.Medicine.MedicineName, // Include MedicineName
            md.DosageId,
            md.Dosage.Amount, // Include Amount
            md.ScheduleId
        })
        .ToList();

    return Ok(medicineDosages);
}


    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var medicineDosage = _dbContext.MedicineDosages
            .Include(md => md.Schedule)
            .Include(md => md.Medicine)
            .Include(md => md.Dosage)
            .FirstOrDefault(md => md.Id == id);

        if (medicineDosage == null)
        {
            return NotFound();
        }

        return Ok(medicineDosage);
    }




// MedicineDosageController.cs

[HttpDelete("deleteAll")]
public IActionResult DeleteAll()
{
    try
    {
        var allMedicineDosages = _dbContext.MedicineDosages.ToList();
        _dbContext.MedicineDosages.RemoveRange(allMedicineDosages);
        _dbContext.SaveChanges();

        return NoContent();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error deleting all medicine dosages: {ex.Message}");
        return StatusCode(500, "Internal Server Error");
    }
}

    [HttpPut("{id}")]
    public IActionResult Edit(int id, [FromBody] MedicineDosage editedMedicineDosage)
    {
        try
        {
            // Validate the incoming request object
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the existing MedicineDosage entry
            var existingMedicineDosage = _dbContext.MedicineDosages
                .Include(md => md.Medicine)
                .Include(md => md.Dosage)
                .FirstOrDefault(md => md.Id == id);

            if (existingMedicineDosage == null)
            {
                return NotFound("Medicine dosage not found");
            }

            // Update properties of the existing MedicineDosage
            existingMedicineDosage.Time = editedMedicineDosage.Time;
            existingMedicineDosage.Medicine.MedicineName = editedMedicineDosage.Medicine.MedicineName;
            existingMedicineDosage.Dosage.Amount = editedMedicineDosage.Dosage.Amount;

            // Save changes to the database
            _dbContext.SaveChanges();

            // Return the updated medicine dosage entry
            return Ok(existingMedicineDosage);
        }
        catch (Exception ex)
        {
            // Handle exceptions as needed
            Console.WriteLine($"Error editing medicine dosage: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }
}


    


