const j22 = require("../src/data/j22.json");
const one = require("../src/data/one.json");
const ltr = require("../src/data/ltr.json");
const mom = require("../src/data/mom.json");
const bro = require("../src/data/bro.json");
const dmu = require("../src/data/dmu.json");
const jmp = require("../src/data/jmp.json");

const data = [...j22, ...one, ...ltr, ...mom, ...dmu, ...bro, ...jmp].sort(
  (a, b) => a.theme.localeCompare(b.theme)
);

module.exports = data;
