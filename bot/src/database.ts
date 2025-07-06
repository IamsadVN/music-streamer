import mysql, { FieldPacket } from "mysql2/promise";
import { dbLogger } from "./utils/logger.js";

const optionsPool: mysql.PoolOptions  = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    waitForConnections: true,
    connectionLimit: 4
}

const poolDatabase = mysql.createPool(optionsPool);

interface DatabaseResponse {
    Database: string
}

try {
    const [result, rows] = await poolDatabase.execute("SHOW DATABASES;") as unknown as [DatabaseResponse[],FieldPacket[]];

    dbLogger.debug(result[0].Database);
    
    dbLogger.info(`Database connected to ${optionsPool.host}:${optionsPool.port} with user "${optionsPool.user}"`);
}
catch (err) {
    dbLogger.error(err);
}


export default poolDatabase;