using System;

namespace FlightBookingAPI.Models
{
    public class Flight
    {
        public int Id { get; set; }
        public string DepartureCity { get; set; }
        public string ArrivalCity { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public decimal Price { get; set; }
        public int AvailablePlaces { get; set; }
    }
}
