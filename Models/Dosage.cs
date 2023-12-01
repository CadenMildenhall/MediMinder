


using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Swashbuckle.AspNetCore.Annotations;

namespace MediMinder.Models;

public class Dosage
{
    public int Id { get; set; }
    public int Amount { get; set; }
    public List<MedicineDosage> MedicineDosages { get; set; }


}