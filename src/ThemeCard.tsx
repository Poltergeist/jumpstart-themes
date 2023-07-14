import { memo } from "react";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Grid from "@mui/material/Grid";

import data from "./data/j22.json";

let cardOverlap = data.reduce(
  (acc, cur) => {
    const theme = cur.theme.replace(/ \d*/g, "");
    if (acc[theme] == null) {
      acc[theme] = {};
      acc.total[theme] = 0;
    }
    acc.total[theme]++;
    cur.cards.forEach((card: string) => {
      if (acc[theme][card] == null) {
        acc[theme][card] = 0;
      }
      acc[theme][card]++;
    });

    return acc;
  },
  { total: {} } as {
    [key: string]: {
      [key: string]: number;
    };
  }
);

const ThemeCard = memo(
  ({
    data,
  }: {
    data: { theme: string; cards: string[]; export: string[] };
  }) => {
    const themeName = data.theme.replace(/ \d*/g, "");
    return (
      <Grid item xs={4}>
        <Card variant="outlined">
          <Typography variant="h3" sx={{ paddingX: "1rem", py: "0.5rem" }}>
            {data.theme}
          </Typography>
          <Divider />
          <List dense={true}>
            {data.cards
              .sort((a, b) =>
                cardOverlap[themeName][a] === cardOverlap[themeName][b]
                  ? a.localeCompare(b)
                  : cardOverlap[themeName][a] > cardOverlap[themeName][b]
                  ? 1
                  : -1
              )
              .map((datum, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: `rgba(74, 165, 111, ${
                      1 -
                      cardOverlap[themeName][datum] /
                        cardOverlap.total[themeName]
                    })`,
                  }}
                >
                  <ListItemText>
                    {datum} {cardOverlap[themeName][datum]}
                  </ListItemText>
                </ListItem>
              ))}

            <ListItem>
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(data.export.join("\n"))
                }
              >
                Copy csv
              </Button>
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(data.cards.join("\n"))
                }
              >
                Copy text
              </Button>
            </ListItem>
          </List>
        </Card>
      </Grid>
    );
  }
);

export default ThemeCard;
