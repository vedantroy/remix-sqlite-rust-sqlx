import getenv from "getenv.ts";

const env = getenv.string("NODE_ENV", "development");
export const IS_PRODUCTION = env === "production";