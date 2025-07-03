import { exec } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";

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

await rm("./dist", { recursive: true, force: true });

await mkdir("./dist");

const start = Date.now();

exec("npx tsc", async (err,stdout,stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    else if (stderr) {
        console.error(stderr);
        return;
    }

    console.log(`Took ${Date.now() - start}ms to build.`);

    await import("./dist/index.js");
})