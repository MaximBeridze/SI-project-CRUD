const path = require("path");
const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "dev";
const allowed = new Set(["dev", "release", "prod"]);

if (!allowed.has(env)) {
  throw new Error(`Invalid NODE_ENV="${env}". Use dev, release, or prod.`);
}

dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

module.exports = { env };