import client from "./bot.js";
import poolDatabase, { testConnection } from "./database.js";

async function clearBeforeExit(): Promise<void> {
    try {
        await client.destroy();
        console.log(`Bot logoutted`);

        await poolDatabase.end();
        console.log(`Database disconnected`);
    }
    catch (err) {
        console.error(err);
    }
}

process.on("SIGKILL", async () => {
    console.log(`Receive "SIGKILL" code, exiting...`);
    await clearBeforeExit();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    console.log(`Receive "SIGTERM" code, exiting...`);
    await clearBeforeExit();
    process.exit(0);
});

process.on("SIGINT", async () => {
    console.log(`Receive "SIGINT" code, exiting...`);
    await clearBeforeExit();
    process.exit(0)
});

process.on("exit", () => {
    console.log(`Process exited with code ${process.exitCode || 0}`);
});

await testConnection();
await import("./bot.js");
await import("./api.js");

