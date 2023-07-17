const data = require("./data");
const fs = require("fs");

let cardOverlap = data.reduce(
  (acc, cur) => {
    const theme = cur.themeGroup || cur.theme.replace(/ \d*/g, "");
    if (acc[theme] == null) {
      acc[theme] = {};
      acc.total[theme] = 0;
    }
    acc.total[theme]++;
    cur.cards.forEach((card) => {
      if (acc[theme][card] == null) {
        acc[theme][card] = 0;
      }
      acc[theme][card]++;
    });

    return acc;
  },
  { total: {} }
);

const newData = data.map((theme) => {
  const themeName = theme.themeGroup || theme.theme.replace(/ \d*/g, "");
  theme.cards.sort((a, b) =>
    cardOverlap[themeName][a] === cardOverlap[themeName][b]
      ? a.localeCompare(b)
      : cardOverlap[themeName][a] > cardOverlap[themeName][b]
      ? 1
      : -1
  );

  return theme;
});

fs.writeFileSync("./src/data/overlap.json", JSON.stringify(cardOverlap));
fs.writeFileSync("./src/data/data.json", JSON.stringify(newData));
