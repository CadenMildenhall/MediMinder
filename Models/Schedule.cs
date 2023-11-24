

using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json.Serialization;

namespace MediMinder.Models
{
    public class Schedule
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The Time field is required.")]
        public DateTime Time { get; set; }
        
        [Required(ErrorMessage = "The day field is required.")]
        public string Day { get; set; }
        [JsonIgnore]
        public ICollection<MedicineDosage> MedicineDosages { get; set; }
    }
}
