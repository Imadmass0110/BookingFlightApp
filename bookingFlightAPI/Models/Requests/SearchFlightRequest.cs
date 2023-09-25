using System;
using System.ComponentModel.DataAnnotations;

namespace FlightBookingAPI.Models.Requests
{
    public class SearchFlightRequest
    {
        [Required(ErrorMessage = "Ville de départ requise.")]
        public string DepartureCity { get; set; }

        [Required(ErrorMessage = "La ville d’arrivée est requise.")]
        public string ArrivalCity { get; set; }

        [Required(ErrorMessage = "La date de départ est requise.")]
        [DataType(DataType.Date)]
        public DateTime DepartureDate { get; set; }

        [Required(ErrorMessage = "La date de retour est requise.")]
        [DataType(DataType.Date)]
        public DateTime ReturnDate { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Le nombre de passagers doit être d’au moins 1.")]
        public int Passengers { get; set; }
    }
}
