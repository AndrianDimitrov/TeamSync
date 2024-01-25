namespace TeamSync.Data.Models
{
    public class Employee : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        // Foreign key for the relationship with Department
        public int DepartmentId { get; set; }

    }
}
