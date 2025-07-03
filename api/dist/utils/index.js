import chalk from "chalk";
function getTime() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() > 9 ? date.getMonth() : "0" + date.getMonth()}-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()} ${date.getHours() > 9 ? date.getHours() : "0" + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds()}`;
}
export const Logger = {
    info: (msg) => {
        console.log(chalk.blue(`[${getTime()}]`), chalk.green("[INFO]"), chalk.white(msg));
    },
    error: (msg) => {
        console.error(chalk.blue(`[${getTime()}]`), chalk.green("[ERROR]"), chalk.red(msg));
    }
};
