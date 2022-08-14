import { BrowserRouter, Switch, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Questions from "./pages/Questions";
import { Box, Container, Typography } from "@mui/material";
import ButtonAppBar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <ButtonAppBar />
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Switch>
            <Route path="/" exact>
              <Typography variant="h2" fontWeight="bold">
                Quiz App
              </Typography>
              <Settings />
            </Route>
            <Route path="/quiz">
              <Questions />
            </Route>
          </Switch>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
