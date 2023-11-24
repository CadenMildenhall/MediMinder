

using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace MediMinder.Models;

public class MedicineDosage
{
    public int Id { get; set; }
    public int MedicineId { get; set; }
    
    [JsonIgnore]
    public Medicine Medicine { get; set; }

    public int DosageId { get; set; }

    [JsonIgnore]
    public Dosage Dosage { get; set; }

    [JsonIgnore]
    public ICollection<Schedule> Schedule { get; set; }

}