import { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
	const [reservationInitiated, setReservationInitiated] = useState(false);

	return (
		<ReservationContext.Provider value={{ reservationInitiated, setReservationInitiated }}>
			{children}
		</ReservationContext.Provider>
	);
};

export const useReservation = () => {
	return useContext(ReservationContext);
};
