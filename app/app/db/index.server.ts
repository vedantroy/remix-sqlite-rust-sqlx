import * as process from "process";
import * as fs from "fs";
import { IS_PRODUCTION } from "~/env.server";

function load() {
  const { platform, arch } = process;
  // Assume we are running GNU
  // TODO: Crash if running on musl (possible on Docker)
  const currentDir = process.cwd();
  const nativeDir = `${currentDir}/build/native`;

  const fileLocation = `${nativeDir}/db_adapter.${platform}-${arch}-gnu.node`;
  if (!fs.existsSync(fileLocation)) {
    throw new Error(`Could not find native module at ${fileLocation}`);
  }
  return require(fileLocation);
}

let db: any;

declare global {
  var __db: any | undefined;
}

db = load();

//if (IS_PRODUCTION) {
//    db = load();
//} else {
//    if (!global.__db) {
//      global.__db = load()
//    } else {
//      global.__db
//    }
//    db = global.__db;
//}

export default db;
