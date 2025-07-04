import chalk from "chalk";
import Listener from "../events/listener.js";
import { glob } from "glob";
import { pathToFileURL } from "node:url";

function getTime(): string {
    const date = new Date();

    return `${date.getFullYear()}-${date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth()}-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()} ${date.getHours() > 9 ? date.getHours() : "0" + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds()}`;
}

const warning = chalk.hex('#FFA500'); 

export const Logger = {
    bot: {
        info: (msg: string) => {
            console.log(chalk.blue(`[${getTime()}]`),chalk.green("[INFO]"),chalk.green("[BOT]"),chalk.white(msg));
        },
        error: (msg: Error) => {
            console.error(chalk.blue(`[${getTime()}]`),chalk.red("[ERROR]"),chalk.red("[BOT]"),chalk.red(msg));
        },
        warn: (msg: string) => {
            console.log(chalk.blue(`[${getTime()}]`), warning("[WARN]"),warning("[BOT]"),warning(msg));
        }

    },
    api: {
        info: (msg: string) => {
            console.log(chalk.blue(`[${getTime()}]`),chalk.green("[INFO]"),chalk.green("[API]"),chalk.white(msg));
        },
        error: (msg: Error) => {
            console.error(chalk.blue(`[${getTime()}]`),chalk.red("[ERROR]"),chalk.red("[API]"),chalk.red(msg));
        },
        warn: (msg: string) => {
            console.log(chalk.blue(`[${getTime()}]`), warning("[WARN]"),warning("[API]"),warning(msg));
        }
    }
}

export async function getListeners(): Promise<Listener[]> {
    const listeners: Listener[] = [];

    for (const file of await glob("dist/events/*/**/*.js")) {
        const fileURL = `${pathToFileURL(file)}`;
        const listener = new (await import(fileURL)).default();
        listeners.push(listener);
    }

    return listeners;
}