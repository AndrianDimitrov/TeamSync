using Microsoft.AspNetCore.Mvc;
using TeamSync.Data.Models;
using TeamSync.Service;

namespace TeamSync.Controllers
{
    [Route("/company")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly CompanyService service;

        public CompanyController(CompanyService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetAllCompanies()
        {
            try
            {
                var companies = await this.service.GetAllCompaniesAsync();
                return Ok(companies);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("create-company")]
        public async Task<ActionResult> CreateCompany([FromBody] Company newCompany)
        {
            try
            {
                await service.CreateCompanyAsync(newCompany);
                return CreatedAtAction(nameof(GetCompanyById), new { companyId = newCompany.Id }, newCompany);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("get-company-by-id")]
        public async Task<ActionResult<Company>> GetCompanyById([FromBody] int companyId)
        {
            try
            {
                var company = await service.GetCompanyByIdAsync(companyId);

                if (company == null)
                {
                    return NotFound(); 
                }

                return Ok(company);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("update-company/{companyId}")]
        public async Task<IActionResult> UpdateCompany(int companyId, [FromBody] Company updatedCompany)
        {
            try
            {
                var existingCompany = await service.GetCompanyByIdAsync(companyId);

                if (existingCompany == null)
                {
                    return NotFound(); 
                }

                existingCompany.Name = updatedCompany.Name;

                await service.UpdateCompanyAsync(existingCompany);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("delete-company/{companyId}")]
        public async Task<IActionResult> DeleteCompany(int companyId)
        {
            try
            {
                var company = await service.GetCompanyByIdAsync(companyId);

                if (company == null)
                {
                    return NotFound(); 
                }

                await service.DeleteCompanyAsync(company.Id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
