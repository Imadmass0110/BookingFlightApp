import React, { useState } from 'react';
import {
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
	TablePagination,
	Button,
	TableSortLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReservation } from './shared/ReservationContext'; // Import the context hook


const FlightResults = ({ flights }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [orderBy, setOrderBy] = useState('price'); // Default sorting column
	const [order, setOrder] = useState('asc'); // Default sorting order
	const { setReservationInitiated } = useReservation(); // Access the context
	const navigate = useNavigate();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleSort = (property) => (event) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleReservation = (flightId) => {
		// Set the flag to indicate that the user initiated the reservation process
		setReservationInitiated(true);
		// Navigate to the reservation page with the selected flight's ID
		navigate(`/reservation/${flightId}`);
	};

	// Format a date string to "mm/dd/yyyy hh:ii" format
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
		return new Date(dateString).toLocaleString('en-US', options);
	};

	// Custom sorting function
	const customSort = (a, b) => {
		const valueA = a[orderBy];
		const valueB = b[orderBy];

		// Determine the sorting order based on the "order" parameter
		const compare = (order === 'asc') ? 1 : -1;
	
		if (typeof valueA === 'string' && typeof valueB === 'string') {
			return valueA.localeCompare(valueB) * compare;
		} else if (typeof valueA === 'number' && typeof valueB === 'number') {
			return (valueA - valueB) * compare;
		} else if (valueA instanceof Date && valueB instanceof Date) {
			return (valueA.getTime() - valueB.getTime()) * compare;
		} else {
			// For other data types, return 0 to maintain the original order
			return 0;
		}
	}

	return (
	<div>
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<TableSortLabel
								active={orderBy === 'departureCity'}
								direction={orderBy === 'departureCity' ? order : 'asc'}
								onClick={handleSort('departureCity')}
							>
								Ville de départ
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={orderBy === 'arrivalCity'}
								direction={orderBy === 'arrivalCity' ? order : 'asc'}
								onClick={handleSort('arrivalCity')}
							>
								Ville d'arrivée
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={orderBy === 'departureDate'}
								direction={orderBy === 'departureDate' ? order : 'asc'}
								onClick={handleSort('departureDate')}
							>
								Date de départ
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={orderBy === 'returnDate'}
								direction={orderBy === 'returnDate' ? order : 'asc'}
								onClick={handleSort('returnDate')}
							>
								Date de retour
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={orderBy === 'price'}
								direction={orderBy === 'price' ? order : 'asc'}
								onClick={handleSort('price')}
							>
								Prix
							</TableSortLabel>
						</TableCell>
						<TableCell>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{flights
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.sort((a, b) => customSort(a,b))
						.map((flight, index) => (
							<TableRow key={index}>
								<TableCell>{flight.departureCity}</TableCell>
								<TableCell>{flight.arrivalCity}</TableCell>
								<TableCell>{formatDate(flight.departureDate)}</TableCell>
								<TableCell>{formatDate(flight.returnDate)}</TableCell>
								<TableCell>{flight.price}</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color="primary"
										onClick={() => handleReservation(flight.id)}
									>
										Réserve
									</Button>
								</TableCell>
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		</TableContainer>
		<TablePagination
			rowsPerPageOptions={[10, 25, 50]}
			component="div"
			count={flights.length}
			rowsPerPage={rowsPerPage}
			page={page}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	</div>
	);
};

export default FlightResults;
