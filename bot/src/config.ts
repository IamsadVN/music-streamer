import dotenv from "dotenv";

dotenv.config();

const configEnv = {
    botToken: process.env.BOT_TOKEN,
    apiPort: process.env.API_PORT,
    debugMode: process.env.DEBUG_MODE,
    database: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        pswd: process.env.DB_PSWD
    }
}

export default configEnv;