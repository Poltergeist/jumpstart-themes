import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import fs from "fs";

const input = fs.readFileSync("./AllJumpstartPacks.csv");

const records = parse(input, {
  columns: true,
  skip_empty_lines: true,
});

const sets = {};
const csv = {};
const results = {};

records.forEach((card) => {
  const set = card.Set === "m21" ? "jmp" : card.Set;
  if (results[set] == null) {
    results[set] = [];
  }

  // if (results[set][card.tags] == null) {
  //   results[set][card.tags] = {};
  // }

  if (sets[set] == null) {
    sets[set] = {};
  }

  if (sets[set][card.tags] == null) {
    sets[set][card.tags] = {};
  }

  if (sets[set][card.tags][card.name] == null) {
    sets[set][card.tags][card.name] = 0;
  }
  sets[set][card.tags][card.name]++;
  if (csv[set] == null) {
    csv[set] = {};
  }

  if (csv[set][card.tags] == null) {
    csv[set][card.tags] = {};
  }

  if (csv[set][card.tags][card.name] == null) {
    csv[set][card.tags][card.name] = 0;
  }
  csv[set][card.tags][card.name] = stringify([Object.values(card)]).replaceAll(
    "\n",
    ""
  );
});

Object.entries(sets).forEach(([set, themes]) => {
  fs.mkdirSync("./" + set);
  Object.entries(themes).forEach(([theme, cards]) => {
    results[set].push({
      theme,
      cards: Object.entries(cards).map(([card, amount]) => `${amount} ${card}`),
      export: Object.entries(cards).map(([card, amount]) =>
        [...Array(amount)].fill(csv[set][theme][card]).join("\n")
      ),
      set,
    });
    const contents = Object.entries(cards)
      .map(([card, amount]) => `${amount} ${card}`)
      .join("\n");
    fs.writeFileSync(`./${set}/${theme}`, contents);
  });
});

Object.entries(results).forEach(([set, result]) => {
  fs.writeFileSync("./" + set + ".json", JSON.stringify(result));
});
