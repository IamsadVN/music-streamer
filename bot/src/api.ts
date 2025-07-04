import express from "express";
import { Logger } from "./utils/index.js";

const app = express();



app.listen(process.env.API_PORT, async () => {
    Logger.api.info(`Server API is running on port ${process.env.API_PORT}`);
})