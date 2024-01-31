using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TeamSync.Data.Models;
using TeamSync.Service;

namespace TeamSync.Controllers
{
    [Route("/department")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly DepartmentService _departmentService;

        public DepartmentController(DepartmentService departmentService)
        {

            _departmentService = departmentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetAllDepartments()
        {
            try
            {
                var departments = await _departmentService.GetAllDepartmentsAsync();
                return Ok(departments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("get-all-departments-by-companyid/{companyId}")]
        public async Task<ActionResult<IEnumerable<Department>>> GetAllDepartmentsByCompanyId(int companyId)
        {
            try
            {
                var departments = await _departmentService.GetAllDepartmentsByCompanyIdAsync(companyId);
                return Ok(departments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("get-department-by-id{departmentId}")]
        public async Task<ActionResult<Department>> GetDepartmentById(int departmentId)
        {
            try
            {
                var department = await _departmentService.GetDepartmentByIdAsync(departmentId);

                if (department == null)
                {
                    return NotFound();
                }

                return Ok(department);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("create-department")]
        public async Task<ActionResult> CreateDepartment([FromBody] Department newDepartment)
        {
            try
            {
                await _departmentService.CreateDepartmentAsync(newDepartment);
                return CreatedAtAction(nameof(GetDepartmentById), new { departmentId = newDepartment.Id }, newDepartment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("update-department{departmentId}")]
        public async Task<ActionResult> UpdateDepartment(int departmentId, [FromBody] Department updatedDepartment)
        {
            try
            {
                if (departmentId != updatedDepartment.Id)
                {
                    return BadRequest("Department ID mismatch");
                }

                var existingDepartment = await _departmentService.GetDepartmentByIdAsync(departmentId);

                if (existingDepartment == null)
                {
                    return NotFound();
                }

                await _departmentService.UpdateDepartmentAsync(updatedDepartment);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("delete-department{departmentId}")]
        public async Task<ActionResult> DeleteDepartment(int departmentId)
        {
            try
            {
                var existingDepartment = await _departmentService.GetDepartmentByIdAsync(departmentId);

                if (existingDepartment == null)
                {
                    return NotFound();
                }

                await _departmentService.DeleteDepartmentAsync(departmentId);
                return NoContent();
            }
           
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
