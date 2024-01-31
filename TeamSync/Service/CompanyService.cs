using Microsoft.EntityFrameworkCore;
using TeamSync.Data;
using TeamSync.Data.Models;

namespace TeamSync.Service
{
    public class CompanyService
    {
        private readonly TeamSyncDbContext dbContext;
        private readonly Company company;


        public CompanyService(TeamSyncDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
        {
            return await dbContext.Companies
                .Include(c => c.Employees)
                .Include(c => c.Departments)
                .ToListAsync();
        }

        public async Task CreateCompanyAsync(Company newCompany)
        {
            dbContext.Companies.Add(newCompany);
            await dbContext.SaveChangesAsync();
        }

        public async Task<Company> GetCompanyByIdAsync(int companyId)
        {
            return await dbContext.Companies
                .Include(c => c.Employees)
                .Include(c => c.Departments)
                .FirstOrDefaultAsync(c => c.Id == companyId);
        }

        public async Task UpdateCompanyAsync(Company updatedCompany)
        {
            dbContext.Entry(updatedCompany).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteCompanyAsync(int companyId)
        {
            var company = await dbContext.Companies.FindAsync(companyId);

            if (company != null)
            {
                dbContext.Companies.Remove(company);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}

