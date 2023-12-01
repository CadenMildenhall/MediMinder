

using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace MediMinder.Models;

public class MedicineDosage
{
    public int Id { get; set; }
    public DateTime Time { get; set; }
    public int? MedicineId { get; set; }
    public Medicine Medicine { get; set; }
    public int? DosageId { get; set; }
    public Dosage Dosage { get; set; }
    public List<ScheduleMedicineDosage> ScheduleMedicineDosages { get; set; }
}
