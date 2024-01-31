using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamSync.Migrations
{
    /// <inheritdoc />
    public partial class DeleteApplicationUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplicationUser",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplicationUser_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUser_EmployeeId",
                table: "ApplicationUser",
                column: "EmployeeId",
                unique: true,
                filter: "[EmployeeId] IS NOT NULL");
        }
    }
}
