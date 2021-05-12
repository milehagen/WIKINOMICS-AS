using Microsoft.EntityFrameworkCore.Migrations;

namespace Bachelor.Migrations
{
    public partial class MigrationCheck2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EmailUpdates",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Viewed",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "OrderInThread",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailUpdates",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Viewed",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "OrderInThread",
                table: "Comments");
        }
    }
}
