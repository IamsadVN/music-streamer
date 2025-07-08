import mysql, { FieldPacket } from "mysql2/promise";
import { dbLogger } from "./utils/logger.js";
import { DatabaseResponse } from "./types/query.js";
import configEnv from "./config.js";

const optionsPool: mysql.PoolOptions  = {
    host: configEnv.database.host,
    port: configEnv.database.port,
    user: configEnv.database.user,
    password: configEnv.database.pswd,
    waitForConnections: true,
    connectionLimit: 4
}

const poolDatabase = mysql.createPool(optionsPool);

export async function testConnection(): Promise<void> {
    try {
        const [result, rows] = await poolDatabase.execute("SHOW DATABASES;") as unknown as [DatabaseResponse[],FieldPacket[]];

        dbLogger.debug(result);
        
        dbLogger.info(`Database connected to ${optionsPool.host}:${optionsPool.port} with user "${optionsPool.user}"`);
    }
    catch (err) {
        dbLogger.error(err);
    }
}

export default poolDatabase;