import { Router } from "express";

import guilds from "./guilds/index.js";

const router = Router();

router.use("/guilds", guilds);

export default router;