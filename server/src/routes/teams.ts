import Router from "express";
import { GetCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbdClient } from "../lib";
import { validateTeamId } from "../middleware";

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

router.get("/:teamId/players/:player", validateTeamId, async (req, resp) => {
    const matchingPlayers = (
        await ddbdClient.send(
            new QueryCommand({
                TableName: "Players",
                KeyConditionExpression: "team = :v_nationName and #P = :v_playerName",
                ExpressionAttributeNames: {
                    "#P": "name",
                },
                ExpressionAttributeValues: {
                    ":v_nationName": req.params.nation,
                    ":v_playerName": req.params.player,
                },
            })
        )
    ).Items as Record<string, string | number>[];
    if (matchingPlayers.length === 0) {
        resp.status(404).json([
            {
                location: "param",
                msg: "Player Not Found",
                param: "player",
                value: req.params.player,
            },
        ]);
        return;
    }
    resp.json(matchingPlayers[0]);
});

export default router;
