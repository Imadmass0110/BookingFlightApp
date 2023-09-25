import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { useSnackbarService } from './shared/SnackbarService';


const ReservationForm = ({ onSubmit }) => {
	const { showErrorMessage } = useSnackbarService();
	const [reservationData, setReservationData] = useState({
		passengerName: '',
		passengerEmail: '',
		passengerPhoneNumber: ''
	});
	

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!matchIsValidTel(reservationData.passengerPhoneNumber))
		{
			showErrorMessage('numéro de téléphone n\'est pas valide');
			return;
		}
		// Call an API to create the reservation with the entered data
		onSubmit(reservationData);
	};

	const handleChange = (event) => {
		const {name, value} = event.target;
		setReservationData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handlePhoneChange = (newValue) => {
		setReservationData((prevData) => ({
			...prevData,
			passengerPhoneNumber: newValue
		}));
	};

	return (
		<Paper elevation={3} style={{ padding: '40px' }}>
			<Typography variant="h5" gutterBottom>Information passager</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={8} md={6} lg={4}>
					<form onChange={handleChange} onSubmit={handleSubmit}>
						<TextField
							label="Nom et prénom"
							fullWidth
							required
							margin="normal"
							value={reservationData.passengerName}
							name="passengerName"
						/>
						<TextField
							label="Adresse e-mail"
							fullWidth
							margin="normal"
							required
							type="email"
							value={reservationData.passengerEmail}
							name="passengerEmail"
						/>
						<MuiTelInput
							label="Numéro de téléphone "
							fullWidth
							required
							margin="normal"
							value={reservationData.passengerPhoneNumber}
							name="passengerPhoneNumber"
							onChange={handlePhoneChange}
						/>
						{/* <TextField
							label="Phone Number"
							fullWidth
							required
							margin="normal"
							value={reservationData.passengerPhoneNumber}
							name="passengerPhoneNumber"
						/> */}
						<Button 
							type="submit"
							variant="contained"
							color="primary"
							sx={{ mt: 2 }}
						>
							Créer une réservation
						</Button>
					</form>
				</Grid>	
			</Grid>
		</Paper>
	);
};

export default ReservationForm;
