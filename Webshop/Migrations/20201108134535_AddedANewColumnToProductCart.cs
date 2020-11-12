using Microsoft.EntityFrameworkCore.Migrations;

namespace Webshop.Migrations
{
    public partial class AddedANewColumnToProductCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "price",
                table: "ProductCarts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "product_Name",
                table: "ProductCarts",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "ProductCarts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "price",
                table: "ProductCarts");

            migrationBuilder.DropColumn(
                name: "product_Name",
                table: "ProductCarts");

            migrationBuilder.DropColumn(
                name: "quantity",
                table: "ProductCarts");
        }
    }
}
