import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quiz
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
