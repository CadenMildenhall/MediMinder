

using System;
namespace MediMinder.Models;

public class Schedule
{
    public int Id { get; set; }
    public int MedicineId { get; set; }
    public int UserId { get; set; }
    public DateTime Time { get; set; }
    public string Day { get; set; }
}