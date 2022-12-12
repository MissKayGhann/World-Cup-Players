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
    console.log(req, resp);
    console.log("Inside POST /teams");
});

export default router;
