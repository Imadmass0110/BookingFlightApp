import React, { useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

const SnackbarServiceContext = React.createContext();

export const SnackbarService = ({ children }) => {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');

	const showSnackbar = (message, severity = 'success') => {
		setSnackbarMessage(message);
		setSnackbarSeverity(severity);
		setSnackbarOpen(true);
	};

	const showSuccessMessage = (message) => {
		showSnackbar(message, 'success');
	};
	
	const showErrorMessage = (message) => {
		showSnackbar(message, 'error');
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	return (
		<SnackbarServiceContext.Provider value={{ showSuccessMessage, showErrorMessage }}>
			{children}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={5000} // Adjust the duration as needed
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust the position as needed
			>
				<Alert
					severity={snackbarSeverity} // Use the severity prop
					action={
						<IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
							<CloseIcon fontSize="small" />
						</IconButton>
					}
				>
					{snackbarMessage}
				</Alert>
				{/* <SnackbarContent
					message={snackbarMessage}
					action={
						<IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
							<CloseIcon fontSize="small" />
						</IconButton>
					}
					severity={snackbarSeverity} // Use the severity prop
				/> */}
			</Snackbar>
		</SnackbarServiceContext.Provider>	
	);
};

export default SnackbarService;

export const useSnackbarService = () => {
	return useContext(SnackbarServiceContext);
};
