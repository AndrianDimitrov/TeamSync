using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamSync.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUser_Employees_EmployeeId",
                table: "ApplicationUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApplicationUser",
                table: "ApplicationUser");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Employees");

            migrationBuilder.RenameTable(
                name: "ApplicationUser",
                newName: "User");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationUser_EmployeeId",
                table: "User",
                newName: "IX_User_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Employees_EmployeeId",
                table: "User",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Employees_EmployeeId",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "ApplicationUser");

            migrationBuilder.RenameIndex(
                name: "IX_User_EmployeeId",
                table: "ApplicationUser",
                newName: "IX_ApplicationUser_EmployeeId");

            migrationBuilder.AddColumn<int>(
                name: "ApplicationUserId",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
    }
}
