using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TeamSync.Data.Models;
using TeamSync.Service;

namespace TeamSync.Controllers
{
    [Route("/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService service;

        public EmployeeController(EmployeeService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees()
        {
            try
            {
                return Ok(await this.service.GetAllEmployees());
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("get-all-employees-by-departmentid/{departmentId}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployeesByDepartmentId(int departmentId)
        {
            try
            {
                var employees = await service.GetAllEmployeesByDepartmentId(departmentId);

                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("get-employee-by-id")]
        public async Task<ActionResult<Employee>> GetEmployeeById([FromBody] int companyId)
        {
            try
            {
                var company = await service.GetById(companyId);

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

        [HttpPost("create-employee")]
        public async Task<ActionResult<Employee>> CreateEmployee([FromBody] Employee newEmployee)
        {
            try
            {
                await service.CreateEmployeeAsync(newEmployee);
                return Ok(newEmployee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("update-employee{employeeId}")]
        public async Task<ActionResult> UpdateEmployee(int employeeId, [FromBody] Employee updatedEmployee)
        {
            try
            {
                if (employeeId != updatedEmployee.Id)
                {
                    return BadRequest("Employee ID mismatch");
                }

                var existingEmployee = await service.GetEmployeeByIdAsync(employeeId);

                if (existingEmployee == null)
                {
                    return NotFound();
                }

                await service.UpdateEmployeeAsync(updatedEmployee);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("delete-employee{employeeId}")]
        public async Task<ActionResult> DeleteEmployee(int employeeId)
        {
            try
            {
                var existingEmployee = await service.GetEmployeeByIdAsync(employeeId);

                if (existingEmployee == null)
                {
                    return NotFound();
                }

                await service.DeleteEmployeeAsync(employeeId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}