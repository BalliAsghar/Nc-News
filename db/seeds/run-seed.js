const devData = require("../data/development-data/index.js");
const db = require("../connection");
const seed = require("./seed.js");

const runSeed = async () => {
  await seed(devData);
  await db.end();
  console.log("Seeding complete");
};

runSeed();
