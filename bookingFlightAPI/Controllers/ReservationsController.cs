// ReservationsController.cs
using FlightBookingAPI.Data;
using FlightBookingAPI.Models;
using FlightBookingAPI.Models.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;

namespace FlightBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<FlightsController> _logger;

        public ReservationsController(ApplicationDbContext context, ILogger<FlightsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("create")]
        public IActionResult CreateReservation([FromBody] CreateReservationRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var flight = _context.Flights.Find(request.FlightId);

                if (flight == null)
                {
                    return NotFound("Vol introuvable");
                }

                // Create a new reservation and add it to the database
                var reservation = new Reservation
                {
                    FlightId = request.FlightId,
                    PassengerName = request.PassengerName,
                    PassengerEmail = request.PassengerEmail,
                    PassengerPhoneNumber = request.PassengerPhoneNumber
                };

                _context.Reservations.Add(reservation);
                _context.SaveChanges();

                return Ok(new { message = "Réservation créée avec succès" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur de création de réservation: {ex.Message}");
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
