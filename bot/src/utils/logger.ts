import chalk from "chalk";

function getTime(): string {
    const date = new Date();

    return `${date.getFullYear()}-${date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth()}-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()} ${date.getHours() > 9 ? date.getHours() : "0" + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds()}`;
}

const warning = chalk.hex('#FFA500');

class Logger {
    private loggerID: string

    constructor(loggerID: string) {
        this.loggerID = `[${loggerID}]`;
    }

    public info(...args: any[]): void {
        console.log(chalk.blue(`[${getTime()}]`), chalk.green("[INFO]"), chalk.green(this.loggerID), chalk.white(...args));
    }
    public error(...args: any[]): void {
        console.error(chalk.blue(`[${getTime()}]`), chalk.red("[ERROR]"), chalk.red(this.loggerID), ...args);
    }
    public warn(...args: any[]): void {
        console.log(chalk.blue(`[${getTime()}]`), warning("[WARN]"), warning(this.loggerID), warning(...args));
    }
    public debug(...args: any[]): void {
        if (process.env.DEBUG_MODE === "true")
            console.log(chalk.blue(`[${getTime()}]`), chalk.green("[DEBUG]"), chalk.green(this.loggerID), ...args);
    }
}

export const botLogger = new Logger("BOT");
export const dbLogger = new Logger("DB");
export const apiLogger = new Logger("API");