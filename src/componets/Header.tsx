import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export function Header(){

return (
    <Box sx={{ flexGrow: 1,  }} >
      <AppBar position="static" >
        <Toolbar>
          
        </Toolbar>
        <div>
            <Button component={Link} to="/card" color="inherit">Card</Button>
            <Button component={Link} to="/home" color="inherit">Home</Button>
          </div>
      </AppBar>
    </Box>
  );
}