import { memo } from "react";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Grid from "@mui/material/Grid";

const cardOverlap = require("./data/overlap.json") as {
  [key: string]: {
    [key: string]: number;
  };
};

const ThemeCard = memo(
  ({
    data,
  }: {
    data: {
      theme: string;
      themeGroup: string | null;
      cards: string[];
      export: string[];
    };
  }) => {
    const themeName = data.themeGroup || data.theme.replace(/ \d*/g, "");
    const cards = data.cards.map((datum, index) => (
      <ListItem
        key={`${data.theme}-${datum}`}
        sx={{
          bgcolor: `rgba(74, 165, 111, ${
            1 - cardOverlap[themeName][datum] / cardOverlap.total[themeName]
          })`,
        }}
      >
        <ListItemText>{datum}</ListItemText>
      </ListItem>
    ));
    return (
      <Grid item xs={12} md={6} lg={4}>
        <Card variant="outlined">
          <Typography variant="h3" sx={{ paddingX: "1rem", py: "0.5rem" }}>
            {data.theme}
          </Typography>
          <Divider />
          <List dense={true}>
            {cards}

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
