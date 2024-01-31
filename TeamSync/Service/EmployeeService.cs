using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamSync.Data;
using TeamSync.Data.Models;

namespace TeamSync.Service
{
    public class EmployeeService
    {
        public readonly TeamSyncDbContext dbContext;

        public EmployeeService(TeamSyncDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            var employees = await dbContext.Employees.ToListAsync();
            return employees;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesByDepartmentId(int departmentId)
        {
            var employees = await dbContext.Employees
                .Where(e => e.DepartmentId == departmentId)
                .ToListAsync();

            return employees;
        }

        public async Task<Employee> GetById(int employeeId)
        {
            try
            {
                var employee = await dbContext.Employees
                    .FirstOrDefaultAsync(e => e.Id == employeeId);

                return employee;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task CreateEmployeeAsync(Employee newEmployee)
        {
            dbContext.Employees.Add(newEmployee);
            await dbContext.SaveChangesAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int employeeId)
        {
            return await dbContext.Employees.FindAsync(employeeId);
        }

        public async Task UpdateEmployeeAsync(Employee updatedEmployee)
        {
            dbContext.Entry(updatedEmployee).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsync(int employeeId)
        {
            var employee = await dbContext.Employees.FindAsync(employeeId);

            if (employee != null)
            {
                dbContext.Employees.Remove(employee);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}