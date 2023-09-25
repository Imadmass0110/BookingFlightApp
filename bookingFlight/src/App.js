import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightSearchPage from './components/FlightSearchPage';
import ReservationPage from './components/ReservationPage';
import { ReservationProvider } from './components/shared/ReservationContext';
import { SnackbarService } from './components/shared/SnackbarService';
import ProtectedReservationRoute from './components/ProtectedReservationRoute';

function App() {

	return (
		<div className="App">
			<h1>Réservation de vols</h1>
			<SnackbarService>
				<Router>
					<ReservationProvider>
						<Routes>
							<Route path="/" exact element={<FlightSearchPage />} />
							<Route path="/reservation/:flightId" element={
								<ProtectedReservationRoute >
									<ReservationPage />
								</ProtectedReservationRoute>
							}/>
						</Routes>
					</ReservationProvider>	
				</Router>
			</SnackbarService>
		</div>
	);
}

export default App;

