const express = require("express");
const cors = require("cors");
const fs = require("fs");
const apiKey = require("./apikey/apikey.cjs");

const app = express();

app.use(cors());
app.use(express.json());

const elements = [
  "hydrogen",
  "helium",
  "lithium",
  "beryllium",
  "boron",
  "carbon",
  "nitrogen",
  "oxygen",
  "fluorine",
  "neon",
  "sodium",
  "magnesium",
  "aluminium",
  "silicon",
  "phosphorus",
  "sulfur",
  "chlorine",
  "argon",
  "potassium",
  "calcium",
  "scandium",
  "titanium",
  "vanadium",
  "chromium",
  "manganese",
  "iron",
  "cobalt",
  "nickel",
  "copper",
  "zinc",
  "gallium",
  "germanium",
  "arsenic",
  "selenium",
  "bromine",
  "krypton",
  "rubidium",
  "strontium",
  "yttrium",
  "zirconium",
  "niobium",
  "molybdenum",
  "technetium",
  "ruthenium",
  "rhodium",
  "palladium",
  "silver",
  "cadmium",
  "indium",
  "tin",
  "antimony",
  "tellurium",
  "iodine",
  "xenon",
  "caesium",
  "barium",
  "hafnium",
  "tantalum",
  "tungsten",
  "rhenium",
  "osmium",
  "iridium",
  "platinum",
  "gold",
  "mercury",
  "thallium",
  "lead",
  "bismuth",
  "polonium",
  "astatine",
  "radon",
  "rutherfordium",
  "dubnium",
  "seaborgium",
  "bohrium",
  "hassium",
  "meitnerium",
  "darmstadtium",
  "roentgenium",
  "copernicium",
  "nihonium",
  "flerovium",
  "moscovium",
  "livermorium",
  "tennessine",
  "oganesson",
  "francium",
  "radium",
];

app.get("/periodictable", (req, res) => {
  res.json(elements);
});

app.get("/periodictable/:element", (req, res) => {
  const dirName = "./JSONs";
  const element = req.params.element;

  if (!elements.includes(element)) {
    res.status(404);
    return;
  }

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }

  const fileNames = fs.readdirSync(dirName);

  if (fileNames.includes(`${element}.json`)) {
    const data = fs.readFileSync(`${dirName}/${element}.json`, "utf-8");
    const parsedData = JSON.parse(data);

    if (parsedData.error) {
      fetch(`https://api.apiverve.com/v1/periodictable/?name=${element}`, {
        headers: {
          "x-api-key": apiKey,
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          fs.writeFileSync(`./JSONs/${element}.json`, JSON.stringify(data));
          console.log(res.json(data));
          return;
        });
    } else {
      res.json(parsedData);
      return;
    }
  } else {
    fetch(`https://api.apiverve.com/v1/periodictable/?name=${element}`, {
      headers: {
        "x-api-key": apiKey,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        fs.writeFileSync(`./JSONs/${element}.json`, JSON.stringify(data));
        res.json(data);
      });
  }
});

const port = 3333;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});