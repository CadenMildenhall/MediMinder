namespace MediMinder.Models
{
    public class ScheduleMedicineDosage
    {
        public int ScheduleId { get; set; }
        public Schedule Schedule { get; set; }

        public int MedicineDosageId { get; set; }
        public MedicineDosage MedicineDosage { get; set; }
    }
}

