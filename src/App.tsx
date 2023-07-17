import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  Select,
  InputLabel,
  OutlinedInput,
  ListItemText,
  MenuItem,
  Checkbox,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import TextField from "@mui/material/TextField";

import ThemeCard from "./ThemeCard";

import data from "./data/data.json";

const sets = data.reduce(
  (acc: string[], { set }) => (!acc.includes(set) ? [...acc, set] : acc),
  []
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [setsSelected, setSetsSelected] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof setsSelected>) => {
    const {
      target: { value },
    } = event;
    setSetsSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <div className="grid">
          <div className="form">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="sets-checkbox-label">Sets</InputLabel>
              <Select
                labelId="sets-checkbox-label"
                id="sets-checkbox"
                multiple
                value={setsSelected}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {sets.map((set) => (
                  <MenuItem key={set} value={set}>
                    <Checkbox checked={setsSelected.indexOf(set) > -1} />
                    <ListItemText primary={set} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          </div>
          {data
            .filter((a) => {
              if (setsSelected.length !== 0 && !setsSelected.includes(a.set)) {
                return false;
              }
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
            .map((datum) => (
              <ThemeCard data={datum} key={`${datum.set}-${datum.theme}`} />
            ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
