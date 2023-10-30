

using MediMinder.Data;
using MediMinder.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
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
// [Authorize]
public IActionResult Get()
{
    return Ok(_dbContext.Medicine);
}

    [HttpPost]
public IActionResult AddMedicine(Medicine medicine)
{

    if (string.IsNullOrEmpty(medicine.MedicineName))
    {
        return BadRequest("Medicine name cannot be empty.");
    }

    _dbContext.Medicine.Add(medicine);
     _dbContext.SaveChanges();
    return Created($"/api/medicine/{medicine.Id}", medicine);
}

}

//     [HttpPost]
// [Authorize]
// public IActionResult CreateWorkOrder(WorkOrder workOrder)
// {
//     workOrder.DateInitiated = DateTime.Now;
//     _dbContext.WorkOrders.Add(workOrder);
//     _dbContext.SaveChanges();
//     return Created($"/api/workorder/{workOrder.Id}", workOrder);
// }

