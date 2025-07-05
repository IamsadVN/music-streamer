import express from "express";
import { apiLogger } from "./utils/logger.js";

const app = express();



app.listen(process.env.API_PORT, async () => {
    apiLogger.info(`Server API is running on port ${process.env.API_PORT}`);
})