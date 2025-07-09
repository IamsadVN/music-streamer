import { Router } from "express";
import { guildLocaleCodeGet } from "../../../database/index.js";

const router = Router();

router.get("/:guildID", async (req,res) => {
    const guildsData = await guildLocaleCodeGet(req.params.guildID);

    if (guildsData.length === 0) {
        res.status(404).json({
            errorCode: 404,
            message: `Not found`
        })
    }
    else {
        res.status(200).json(guildsData);
    }
});

export default router;