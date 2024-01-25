namespace TeamSync.Data.Models
{
    public class Department : BaseEntity
    {
        public string Name { get; set; }

        // Foreign key for the relationship with Company
        public int CompanyId { get; set; }

        // Navigation property for related employees
        public List<Employee> Employees { get; set; }

    }
}
