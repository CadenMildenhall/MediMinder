using System.Text.Json.Serialization;
using Swashbuckle.AspNetCore.Annotations;

namespace MediMinder.Models;

public class Medicine
{
    public int Id { get; set; }
    public string MedicineName { get; set; }
    public List<MedicineDosage> MedicineDosages { get; set; }

}