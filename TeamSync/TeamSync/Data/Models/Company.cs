namespace TeamSync.Data.Models
{
    public class Company:BaseEntity
    {
        public string Name { get; set; }

        // Navigation property for related employees
        public List<Employee> Employees { get; set; }

        // Navigation property for related departments
        public List<Department> Departments { get; set; }
    }
}
