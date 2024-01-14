import Alert from '@mui/material/Alert';
import { AlertTitle } from "@mui/material";

const BrokenPageAlert = () => {
    return (
        <Alert severity="error" >
            <AlertTitle>Service Down </AlertTitle>
            The plants database is currently down due to maintenance. Please check back again later.
        </Alert>)
}

export default BrokenPageAlert;