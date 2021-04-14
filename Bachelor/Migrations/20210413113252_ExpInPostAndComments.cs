using Microsoft.EntityFrameworkCore.Migrations;

namespace Bachelor.Migrations
{
    public partial class ExpInPostAndComments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExperienceId",
                table: "Posts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ExperienceId",
                table: "Comments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_ExperienceId",
                table: "Posts",
                column: "ExperienceId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ExperienceId",
                table: "Comments",
                column: "ExperienceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Experiences_ExperienceId",
                table: "Comments",
                column: "ExperienceId",
                principalTable: "Experiences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Experiences_ExperienceId",
                table: "Posts",
                column: "ExperienceId",
                principalTable: "Experiences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Experiences_ExperienceId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Experiences_ExperienceId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_ExperienceId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Comments_ExperienceId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "ExperienceId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "ExperienceId",
                table: "Comments");
        }
    }
}
