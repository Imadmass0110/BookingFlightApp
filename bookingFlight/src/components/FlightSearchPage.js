import React, { useState } from 'react';
import FlightResults from './FlightResults';
import {
  Grid,
  Paper,
  Button,
  /* Menu, */
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  TextField,
  IconButton
} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSnackbarService } from './shared/SnackbarService';

const FlightSearchPage = () => {
	const { showSuccessMessage, showErrorMessage } = useSnackbarService();
	// const [anchorEl, setAnchorEl] = useState(null);
	const [searchData, setSearchData] = useState({
		departureCity: '',
		arrivalCity: '',
		departureDate: '',
		returnDate: '',
		passengers: 1,
	});
	const [searchResults, setSearchResults] = useState([]);
	const [showResults, setShowResults] = useState(false); // Toggle to show/hide results
	const [formErrors, setFormErrors] = useState({
		departureCity: '',
		arrivalCity: '',
		departureDate: '',
		returnDate: '',
	});
	const cities = ['Casablanca', 'Rabat', 'Agadir', 'Marrakesh', 'Tanger']; // Add cities if needed

	/* const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	}; */

	const handleChange = (event) => {
		const {name, value} = event.target;
		setSearchData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	/* const handleClose = () => {
		setAnchorEl(null);
	}; */

	const increasePassengers = () => {
		setSearchData((prevData) => ({
			...prevData,
			passengers: prevData.passengers + 1,
		}));
	};

	const decreasePassengers = () => {
		if (searchData.passengers > 1) {
			setSearchData((prevData) => ({
				...prevData,
				passengers: prevData.passengers - 1,
			}));
		}
	};

	const handleSearch = () => {
		// Validate the form
		const errors = {};
		if (!searchData.departureCity) {
			errors.departureCity = 'Ville de départ requise';
		}
		if (searchData.departureCity === searchData.arrivalCity) {
			errors.arrivalCity = 'Les villes de départ et d\'arrivée doivent être différentes';
		}
		if (!searchData.arrivalCity) {
			errors.arrivalCity = 'La ville d\'arrivée est requise';
		}
		if (!searchData.departureDate) {
			errors.departureDate = 'Date de départ requise';
		}
		if (!searchData.returnDate) {
			errors.returnDate = 'Date de retour requise';
		}

		// If there are validation errors, update the state and don't proceed with the search
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			setShowResults(false);
		} else {
			// Clear any previous errors
			setFormErrors({});
			// Make a fetch request to the flight search API endpoint
			fetch('http://localhost:5000/api/flights/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(searchData),
			})
			.then((response) => {
				if (!response.ok) {
				  showErrorMessage('Impossible de rechercher des vols. Veuillez réessayer plus tard.');
				  throw new Error('La réponse du réseau n\'était pas correcte');
				}
				return response.json();
			})
			.then((data) => {
				showSuccessMessage('Vols récupérés avec succès.');
				setSearchResults(data); // Update search results with API response
				setShowResults(true); // update show results
			})
			.catch((error) => {
				showErrorMessage('Une erreur s\'est produite lors de la recherche de vols. Veuillez réessayer plus tard.');
   				console.error('Erreur d\'extraction API:', error);
			});
		}
	};

	return (
		<React.Fragment>
			<Paper elevation={3} style={{ padding: '40px' }}>
				<Typography variant="h6" gutterBottom>
					Recherche de vol
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<InputLabel>Ville de départ</InputLabel>
							<Select
								name="departureCity"
								value={searchData.departureCity}
								onChange={handleChange}
								error={Boolean(formErrors.departureCity)}
							>
								<MenuItem value="">--- Veuillez choisir une ville ---</MenuItem>
								{cities.map((c,i) => {
									return <MenuItem key={i} value={c}>{c}</MenuItem>
								})}
							</Select>
							<Typography color="error">{formErrors.departureCity}</Typography>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<InputLabel>ville d'arrivée</InputLabel>
							<Select
								name="arrivalCity"
								value={searchData.arrivalCity}
								onChange={handleChange}
								error={Boolean(formErrors.arrivalCity)}
							>
								<MenuItem value="">--- Veuillez choisir une ville ---</MenuItem>
								{cities.map((c,i) => {
									return <MenuItem key={i} value={c}>{c}</MenuItem>
								})}
							</Select>
							<Typography color="error">{formErrors.arrivalCity}</Typography>
						</FormControl>
					</Grid>
					<Grid item xs={6} sm={3}>
						<TextField
							label="Date de départ"
							type="date"
							fullWidth
							InputLabelProps={{ shrink: true }}
							name="departureDate"
							value={searchData.departureDate}
							onChange={handleChange}
							error={Boolean(formErrors.departureDate)}
						/>
						<Typography color="error">{formErrors.departureDate}</Typography>
					</Grid>
					<Grid item xs={6} sm={3}>
						<TextField
							label="Date de retour"
							type="date"
							fullWidth
							InputLabelProps={{ shrink: true }}
							name="returnDate"
							value={searchData.returnDate}
							onChange={handleChange}
							error={Boolean(formErrors.returnDate)}
						/>
						<Typography color="error">{formErrors.returnDate}</Typography>
					</Grid>
					<Grid item xs={12} sm={6} style={{ display: 'flex', alignItems : 'center'}}>
						<IconButton color="primary" onClick={decreasePassengers} size="small">
							<RemoveIcon />
						</IconButton>
						<TextField
							label="Nombre de passagers "
							variant="outlined"
							value={searchData.passengers}
							InputProps={{
							readOnly: true,
							style: { textAlign: 'center' }, // Center-align the text
							}}
						/>
						<IconButton color="primary" onClick={increasePassengers} size="small">
							<AddIcon />
						</IconButton>
						{
						// Implementaion using menu
						/* <Button 
							aria-controls="passengers-menu"
							aria-haspopup="true"
							onClick={handleClick}
							variant="contained"
							fullWidth
						>
							Passengers: {searchData.passengers}
						</Button>
						<Menu
							id="passengers-menu"
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={increasePassengers}>Increase</MenuItem>
							<MenuItem onClick={decreasePassengers}>Decrease</MenuItem>
						</Menu> */}
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<DateRangeIcon />}
							onClick={handleSearch}
						>
							Rechercher des vols
						</Button>
					</Grid>
				</Grid>
			</Paper>

			{/* Display flight results if showResults is true */}
			{showResults && <FlightResults flights={searchResults} />}
		</React.Fragment>
	);
};

export default FlightSearchPage;
