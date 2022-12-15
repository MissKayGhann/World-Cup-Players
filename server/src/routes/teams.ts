import Router from "express";
import { GetCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbdClient } from "../lib";
import { validatePlayer, validateTeamId } from "../middleware";

const router = Router();

router.get("/", async (_, resp) => {
    const teams = (await ddbdClient.send(new ScanCommand({ TableName: "Teams" }))).Items;
    resp.json(teams);
});

router.get("/:teamId", validateTeamId, async (req, resp) => {
    const team = (
        await ddbdClient.send(
            new GetCommand({ TableName: "Teams", Key: { nation: req.params.nation } })
        )
    ).Item;
    resp.json(team);
});

router.get("/:teamId/players", validateTeamId, async (req, resp) => {
    const players = (
        await ddbdClient.send(
            new QueryCommand({
                TableName: "Players",
                KeyConditionExpression: "team = :v_nation",
                ExpressionAttributeValues: {
                    ":v_nation": req.params.nation,
                },
            })
        )
    ).Items;
    resp.json(players);
});

router.get("/:teamId/players/:playerName", validateTeamId, validatePlayer, async (req, resp) => {
    resp.json(req.body.player);
});

router.get(
    "/:teamId/players/:playerName/photo",
    validateTeamId,
    validatePlayer,
    async (req, resp) => {
        if (req.body.player.photo === undefined) {
            // Call a helper function that deals with getting photo from api
            // instead of doing a 404 not found
            resp.status(404).json("photo not found");
            return;
        }
        resp.json(req.body.player);
    }
);

export default router;
