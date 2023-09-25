using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightBookingAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Flights",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DepartureCity = table.Column<string>(nullable: true),
                    ArrivalCity = table.Column<string>(nullable: true),
                    DepartureDate = table.Column<DateTime>(nullable: false),
                    ReturnDate = table.Column<DateTime>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    AvailablePlaces = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flights", x => x.Id);
                });

            // Insert sample data into the Flight table
            migrationBuilder.InsertData(
                table: "Flights",
                columns: new[] { "DepartureCity", "ArrivalCity", "DepartureDate", "ReturnDate", "Price", "AvailablePlaces" },
                values: new object[,]
                {
            { "Rabat", "Casablanca", new DateTime(2023, 10, 1, 8, 0, 0), new DateTime(2023, 10, 1, 14, 0, 0), 250.0m, 150 },
            { "Tanger", "Agadir", new DateTime(2023, 10, 2, 10, 0, 0), new DateTime(2023, 10, 2, 16, 0, 0), 300.0m, 100 },
                    // Add more sample flights as needed
                });

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FlightId = table.Column<int>(nullable: false),
                    PassengerName = table.Column<string>(nullable: true),
                    PassengerEmail = table.Column<string>(nullable: true),
                    PassengerPhoneNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservations_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_FlightId",
                table: "Reservations",
                column: "FlightId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropTable(
                name: "Flights");
        }
    }
}
