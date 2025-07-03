import express from "express";
import { config } from "dotenv";
import { Logger } from "./utils/index.js";

config();

const app = express();

app.listen(process.env.PORT,() => {
    Logger.info(`Server is running on port ${process.env.PORT}`);
});