import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useReservation } from './shared/ReservationContext'; // Import the context hook

const ProtectedReservationRoute = ({ children }) => {
	const { flightId } = useParams(); // Get the flight ID from the URL parameter
	const { reservationInitiated } = useReservation(); // Access the context

	if (!flightId || !reservationInitiated) {
		// If the user has not initiated the reservation, redirect them to home page
		return <Navigate to="/" replace />;
	}

	// If the user is allowed, render the child components (ReservationPage)
	return <>{children}</>;
};

export default ProtectedReservationRoute;
