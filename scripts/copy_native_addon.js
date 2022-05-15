#! /usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log(`Copying files ...`)

const ROOT = "db_adapter";
const OUT_FOLDER = path.join("app", "build", "native");
fs.mkdirSync(OUT_FOLDER, { recursive: true });
const node_files = fs
  .readdirSync(ROOT)
  .filter((file) => file.endsWith(".node"));

for (const file of node_files) {
  fs.copyFileSync(path.join(ROOT, file), path.join(OUT_FOLDER, file));
}

console.log(`Finished copying: ${node_files.join(", ")} to ${OUT_FOLDER}`);