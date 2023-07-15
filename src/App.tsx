import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import ThemeCard from "./ThemeCard";

import data from "./data";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ padding: "2em" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Search Card Or Theme"
              variant="standard"
              value={searchValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchValue(event.target.value);
              }}
              sx={{ width: "35ch" }}
            />
            {searchValue !== "" && (
              <Button onClick={() => setSearchValue("")}>clear</Button>
            )}
          </Grid>
          {data
            .filter((a) => {
              if (searchValue === "" || searchValue.length < 2) {
                return true;
              }

              return (
                a.cards.some((x: string) => {
                  return x.toLowerCase().search(searchValue.toLowerCase()) ===
                    -1
                    ? false
                    : true;
                }) ||
                (a.theme.toLowerCase().search(searchValue.toLowerCase()) === -1
                  ? false
                  : true)
              );
            })
            .map((datum, index) => (
              <ThemeCard data={datum} key={index} />
            ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
