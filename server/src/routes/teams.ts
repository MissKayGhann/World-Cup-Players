import Router from "express";
import { validateTeam } from "../middleware";

const router = Router();

router.get("/teams", async (_, resp) => {
    resp.json([]);
});

router.delete("/teams", async (_, resp) => {
    resp.status(204).json([]);
});

router.post("/teams", validateTeam, async (req, resp) => {
    console.log(req.body);
    console.log("Inside POST /teams");
    resp.sendStatus(201);
});

export default router;
