// FlightsController.cs
using FlightBookingAPI.Data;
using FlightBookingAPI.Models;
using FlightBookingAPI.Models.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<FlightsController> _logger;

        public FlightsController(ApplicationDbContext context, ILogger<FlightsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("search")]
        public async Task<ActionResult<IEnumerable<Flight>>> SearchFlights([FromBody] SearchFlightRequest request)
        {
            try
            {
                var query = _context.Flights.AsQueryable();

                if (!string.IsNullOrWhiteSpace(request.DepartureCity))
                {
                    query = query.Where(f => f.DepartureCity.ToLower().Contains(request.DepartureCity.ToLower()));
                }

                if (!string.IsNullOrWhiteSpace(request.ArrivalCity))
                {
                    query = query.Where(f => f.ArrivalCity.ToLower().Contains(request.ArrivalCity.ToLower()));
                }

                if (request.DepartureDate != default(DateTime))
                {
                    var DepartureDate = request.DepartureDate.Date;
                    query = query.Where(f => f.DepartureDate.Date == DepartureDate);
                }

                if (request.ReturnDate != default(DateTime))
                {
                    var returnDate = request.ReturnDate.Date;
                    query = query.Where(f => f.ReturnDate.Date == returnDate);
                }

                if (request.Passengers > 0)
                {
                    query = query.Where(f => f.AvailablePlaces >= request.Passengers);
                }

                var flights = await query.ToListAsync();
                return flights;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur de recherche de vols: {ex.Message}");
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
