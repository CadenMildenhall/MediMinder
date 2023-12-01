

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json.Serialization;

namespace MediMinder.Models
{
public class Schedule
{
    public int Id { get; set; }
    // public DateTime Time { get; set; }
    public string Day { get; set; }

    public int MedicineId { get; set; }
    public int DosageId { get; set; }

    // Foreign key property
 public List<ScheduleMedicineDosage> ScheduleMedicineDosages { get; set; }
}


}
