import { memo } from "react";
import "./ThemeCard.css";

import { Button } from "@mui/material";

const cardOverlap = require("./data/overlap.json") as {
  [key: string]: {
    [key: string]: number;
  };
};

const ThemeCard = memo(
  ({
    data,
  }: {
    data: { theme: string; cards: string[]; export: string[] };
  }) => {
    const themeName = data.theme.replace(/ \d*/g, "");
    const cards = data.cards.map((datum, index) => (
      <li
        key={`${data.theme}-${datum}`}
        style={{
          background: `rgba(74, 165, 111, ${
            1 - cardOverlap[themeName][datum] / cardOverlap.total[themeName]
          })`,
        }}
      >
        <span>{datum}</span>
      </li>
    ));
    return (
      <div>
        <div>
          <h3>{data.theme}</h3>
          <hr />
          <ul className="cardlist">{cards}</ul>

          <div className="">
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
          </div>
        </div>
      </div>
    );
  }
);

export default ThemeCard;
