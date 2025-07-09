import express from "express";
import { apiLogger } from "./utils/logger.js";
import configEnv from "./config.js";
import cors from "cors";
import { requestLogger } from "./api/middlewares/index.js";
import routers from "./api/routers/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(requestLogger);

app.use("/", routers)

app.listen(configEnv.apiPort, async () => {
    apiLogger.info(`Server API is running on port ${configEnv.apiPort}`);
})