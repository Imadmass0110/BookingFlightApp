using System.ComponentModel.DataAnnotations.Schema;

namespace FlightBookingAPI.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int FlightId { get; set; }

        [ForeignKey("FlightId")]
        public Flight Flight { get; set; }
        public string PassengerName { get; set; }
        public string PassengerEmail { get; set; }
        public string PassengerPhoneNumber { get; set; }
    }

}
