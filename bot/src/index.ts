import { config } from "dotenv";

config();

await import("./bot.js");
await import("./api.js");
await import("./database.js");