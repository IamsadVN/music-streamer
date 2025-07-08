import { testConnection } from "./database.js";

process.on("SIGKILL", () => {
    console.log(`Receive "SIGKILL" code, exiting...`);

    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log(`Receive "SIGTERM" code, exiting...`);

    process.exit(0);
});

process.on("SIGINT", () => {
    console.log(`Receive "SIGINT code, exiting...`);

    process.exit(0)
});

process.on("exit", () => {
    console.log(`Process exited with code ${process.exitCode || 0}`);
});

await testConnection();
await import("./bot.js");
await import("./api.js");

