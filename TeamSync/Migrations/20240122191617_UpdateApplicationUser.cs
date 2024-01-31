using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamSync.Migrations
{
    /// <inheritdoc />
    public partial class UpdateApplicationUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUsers_Employees_EmployeeId",
                table: "ApplicationUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApplicationUsers",
                table: "ApplicationUsers");

            migrationBuilder.RenameTable(
                name: "ApplicationUsers",
                newName: "ApplicationUser");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationUsers_EmployeeId",
                table: "ApplicationUser",
                newName: "IX_ApplicationUser_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApplicationUser",
                table: "ApplicationUser",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUser_Employees_EmployeeId",
                table: "ApplicationUser",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUser_Employees_EmployeeId",
                table: "ApplicationUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApplicationUser",
                table: "ApplicationUser");

            migrationBuilder.RenameTable(
                name: "ApplicationUser",
                newName: "ApplicationUsers");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationUser_EmployeeId",
                table: "ApplicationUsers",
                newName: "IX_ApplicationUsers_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApplicationUsers",
                table: "ApplicationUsers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUsers_Employees_EmployeeId",
                table: "ApplicationUsers",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
