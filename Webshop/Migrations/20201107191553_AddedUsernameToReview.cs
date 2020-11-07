using Microsoft.EntityFrameworkCore.Migrations;

namespace Webshop.Migrations
{
    public partial class AddedUsernameToReview : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Reviews",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Username",
                table: "Reviews");
        }
    }
}
