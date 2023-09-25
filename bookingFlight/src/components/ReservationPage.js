import React from 'react';
import ReservationForm from './ReservationForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbarService } from './shared/SnackbarService';


const ReservationPage = () => {
	const { flightId } = useParams(); // Get the flight ID from the URL parameter
	const navigate = useNavigate();
	const { showSuccessMessage, showErrorMessage } = useSnackbarService();


	const handleReservationSubmit = async (data) => {
		try {
			// Make an API call to create a reservation
			const response = await fetch('http://localhost:5000/api/reservations/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					flightId : parseInt(flightId), // Pass the flight ID as part of the reservation data
					...data, // Include passenger information
				}),
			});

			if (response.ok) {
				// Reservation was successful
				const result = await response.json();
				showSuccessMessage(result.message);

				// Redirect to search
				navigate('/');
			} else {
				// Reservation failed
				showErrorMessage('Impossible de créer une réservation. Veuillez réessayer plus tard.');
			}
		} catch (error) {
			showErrorMessage('Une erreur est survenue lors du traitement de votre demande. Veuillez réessayer plus tard.');
			console.error('Erreur de création de réservation :', error);
		}
	};

	return (
		<div>
			<ReservationForm onSubmit={handleReservationSubmit} />
		</div>
	);
};

export default ReservationPage;
