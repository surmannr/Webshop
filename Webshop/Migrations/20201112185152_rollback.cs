using Microsoft.EntityFrameworkCore.Migrations;

namespace Webshop.Migrations
{
    public partial class rollback : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "UsersFavouriteProducts");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UsersFavouriteProducts");

            migrationBuilder.AddColumn<int>(
                name: "ProductIndex",
                table: "UsersFavouriteProducts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UserIndex",
                table: "UsersFavouriteProducts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductIndex",
                table: "UsersFavouriteProducts");

            migrationBuilder.DropColumn(
                name: "UserIndex",
                table: "UsersFavouriteProducts");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "UsersFavouriteProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "UsersFavouriteProducts",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
