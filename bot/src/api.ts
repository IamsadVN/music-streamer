import express from "express";
import { apiLogger } from "./utils/logger.js";
import configEnv from "./config.js";

const app = express();



app.listen(configEnv.apiPort, async () => {
    apiLogger.info(`Server API is running on port ${configEnv.apiPort}`);
})