using Microsoft.EntityFrameworkCore.Migrations;

namespace Bachelor.Migrations
{
    public partial class BusinessInExp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "business",
                table: "Experiences",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "business",
                table: "Experiences");
        }
    }
}
