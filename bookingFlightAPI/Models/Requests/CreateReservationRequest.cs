using System.ComponentModel.DataAnnotations;

namespace FlightBookingAPI.Models.Requests
{
    public class CreateReservationRequest
    {

        public int FlightId { get; set; }

        [Required(ErrorMessage = "Le nom du passager est requis.")]
        public string PassengerName { get; set; }

        [Required(ErrorMessage = "Adresse e-mail est requise.")]
        [EmailAddress(ErrorMessage = "Adresse email invalide.")]
        public string PassengerEmail { get; set; }

        [Required(ErrorMessage = "Numéro de téléphone est requis.")]
        public string PassengerPhoneNumber { get; set; }
    }
}
