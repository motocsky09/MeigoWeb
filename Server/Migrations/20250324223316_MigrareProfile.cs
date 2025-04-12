using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class MigrareProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Street_no",
                table: "Order",
                newName: "City");

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Profile",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Profile");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Order",
                newName: "Street_no");
        }
    }
}
