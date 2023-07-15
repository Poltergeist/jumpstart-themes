import j22 from "./data/j22.json";
import one from "./data/one.json";
import ltr from "./data/ltr.json";
import mom from "./data/mom.json";
import bro from "./data/bro.json";
import dmu from "./data/dmu.json";
import jmp from "./data/jmp.json";

const data = [...j22, ...one, ...ltr, ...mom, ...dmu, ...bro, ...jmp].sort(
  (a, b) => a.theme.localeCompare(b.theme)
);

export default data;
