import mysql, { FieldPacket } from "mysql2/promise";
import { dbLogger } from "./utils/logger.js";
import { DatabaseResponse } from "./types/query.js";

const optionsPool: mysql.PoolOptions  = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    waitForConnections: true,
    connectionLimit: 4
}

const poolDatabase = mysql.createPool(optionsPool);



try {
    const [result, rows] = await poolDatabase.execute("SHOW DATABASES;") as unknown as [DatabaseResponse[],FieldPacket[]];

    dbLogger.debug(result);
    
    dbLogger.info(`Database connected to ${optionsPool.host}:${optionsPool.port} with user "${optionsPool.user}"`);
}
catch (err) {
    dbLogger.error(err);
}


export default poolDatabase;