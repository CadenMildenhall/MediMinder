

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json.Serialization;

namespace MediMinder.Models
{
public class Schedule
{
    public int Id { get; set; }
    public string? Day { get; set; }
    [JsonIgnore]
    // In UserProfile class
public ICollection<MedicineDosage>? MedicineDosages { get; set; }

}


}
