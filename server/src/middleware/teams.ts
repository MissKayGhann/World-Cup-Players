import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Request, Response, NextFunction } from "express";
import { ddbdClient } from "../lib";

/**
 * Convert a string to title case (e.g. "hello world" -> "Hello World").
 * @param string The string to convert to title case.
 * @returns The string converted to title case.
 */
function toTitleCase(string: string) {
    const words = string.split(" ");
    return words.map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

/**
 * Get the nation that has the specified fifa code.
 * @param fifaCode The fifa code to check for.
 * @returns The corresponding nation, if found, else null
 */
async function getNationFromFifaCode(fifaCode: string): Promise<string | null> {
    const matchingTeams = (
        await ddbdClient.send(
            new QueryCommand({
                TableName: "Teams",
                IndexName: "fifaCode-index",
                ProjectionExpression: "nation",
                KeyConditionExpression: "fifaCode = :v_fifaCode",
                ExpressionAttributeValues: {
                    ":v_fifaCode": fifaCode.toUpperCase(),
                },
            })
        )
    ).Items as Record<"nation", string>[];
    if (matchingTeams.length > 0) return matchingTeams[0].nation;
    else return null;
}

/**
 * Determine whether a team with the provided nation is in DynamoDB.
 * @param nation The nation to check for.
 * @returns `true` if a matching team is found, else `false`.
 */
async function teamNationExists(nation: string) {
    const data = (
        await ddbdClient.send(
            new QueryCommand({
                TableName: "Teams",
                ProjectionExpression: "nation",
                KeyConditionExpression: "nation = :v_nation",
                ExpressionAttributeValues: {
                    ":v_nation": toTitleCase(nation),
                },
            })
        )
    ).Items as Record<"nation", string>[];
    return data.length > 0;
}

export async function validateTeamId(req: Request, resp: Response, next: NextFunction) {
    const teamId = req.params.teamId;

    let nation;
    if (/^[A-z]{3}$/.test(teamId)) {
        // Provided a fifa code
        nation = await getNationFromFifaCode(teamId);
        if (!nation) {
            resp.status(404).json([
                {
                    location: "param",
                    msg: "Team Not Found - Invalid Fifa Code",
                    param: "teamId",
                    value: teamId,
                },
            ]);
            return;
        }
    } else {
        // Provided a nation name
        const nationExists = await teamNationExists(teamId);
        if (!nationExists) {
            resp.status(404).json([
                {
                    location: "param",
                    msg: "Team Not Found - Invalid Nation",
                    param: "teamId",
                    value: teamId,
                },
            ]);
            return;
        }
        nation = toTitleCase(teamId);
    }
    req.params.nation = nation;
    next();
}
