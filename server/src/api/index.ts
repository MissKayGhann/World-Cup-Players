import apiData from "../output.json";
import fs from "fs";
import path from "path";

import { ddbdClient } from "../lib";
import { TeamName, Player } from "./types";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

async function getMatchingDynamoDBPlayers(dob: string, team: TeamName) {
    return (
        await ddbdClient.send(
            new QueryCommand({
                TableName: "Players",
                IndexName: "dob-team-index",
                ProjectionExpression: "team,#N,dob",
                ExpressionAttributeNames: { "#N": "name" },
                KeyConditionExpression: "dob = :v_dob and team = :v_team",
                ExpressionAttributeValues: {
                    ":v_dob": dob,
                    ":v_team": team,
                },
            })
        )
    ).Items as Record<string, any>[];
}

async function processPlayers(players: Record<TeamName, Player[]>) {
    let noMatches = 0;
    let singleMatches = 0;
    let multipleMatches = 0;

    for (let [team, playersOfTeam] of Object.entries(players)) {
        for (let playerOfTeam of playersOfTeam) {
            await new Promise(r => setTimeout(r, 50));
            const matchingPlayers = await getMatchingDynamoDBPlayers(
                playerOfTeam.dob,
                team === "USA" ? "United States" : team
            );
            if (matchingPlayers.length === 0) {
                // No matches
                console.log(`Couldn't find a matching player for ${team}'s ${playerOfTeam.name}.`);
                noMatches++;
            } else if (matchingPlayers.length > 1) {
                // Multiple matches
                console.log(
                    `${team}'s ${playerOfTeam.name} has ${
                        matchingPlayers.length
                    } matches: ${JSON.stringify(matchingPlayers)}`
                );
                multipleMatches++;
            } else {
                // Exactly one match
                console.log(
                    `Matched ${team}'s ${playerOfTeam.name} to ${JSON.stringify(matchingPlayers)}`
                );
                singleMatches++;
            }
        }
    }
    const noMatchesPercent = ((noMatches / 831) * 100).toFixed(2);
    const singleMatchesPercent = ((singleMatches / 831) * 100).toFixed(2);
    const multipleMatchesPercent = ((multipleMatches / 831) * 100).toFixed(2);
    console.log(
        `No matches: ${noMatches} (${noMatchesPercent}%)\n` +
            `Single Matches: ${singleMatches} (${singleMatchesPercent}%)\n` +
            `Multiple Matches: ${multipleMatches} (${multipleMatchesPercent}%)`
    );
}

function findDuplicatePlayers(players: Record<TeamName, Player[]>) {
    const playerIds = new Set();
    for (let [team, playersOfTeam] of Object.entries(players)) {
        for (let playerOfTeam of playersOfTeam) {
            const id = (/\/\d+\.png/.exec(playerOfTeam.photo) as RegExpExecArray)[0].slice(1, -4);
            if (playerIds.has(id)) {
                console.log(`Duplicate player found: ${team}'s ${[playerOfTeam.name]} (id ${id})`);
            } else {
                playerIds.add(id);
            }
        }
    }
}

const newData: Record<string, Player[]> = {};
for (let [nation, players] of Object.entries(apiData)) {
    newData[nation] = [];
    for (let player of players) {
        const newPlayer: any = {};
        for (let [key, value] of Object.entries(player)) {
            if (key !== "injured" && key !== "captain") {
                newPlayer[key] = value;
            }
        }
        newData[nation].push(newPlayer);
    }
}
fs.writeFile(
    path.join(__dirname, "../newOutput.json"),
    JSON.stringify(newData, undefined, 4),
    err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Successfully wrote to new output file");
        throw new Error("done");
        findDuplicatePlayers(apiData as Record<string, Player[]>);
        processPlayers(apiData as Record<string, Player[]>).then(() => console.log("Done"));
    }
);

// import "isomorphic-fetch";
// import fs from "node:fs";
// import path from "node:path";
// import { config } from "dotenv";
// import { APIResponse, Player, TeamName } from "./types";

// config({ path: path.join(__dirname, "../../.env") });

// async function getPlayers() {
//     const players: Record<TeamName, Player[]> = {};
//     let totalPlayers = 0;
//     let stopBeforeQuery = false;
//     let sleepBeforeQuery = false;
//     for (let page = 1; page <= 42; page++) {
//         // The API endpoint we're using has a total of 42 pages
//         if (stopBeforeQuery) {
//             console.log(
//                 `Stopping as stopBeforeQuery is true. Reached page ${page}/42 and retrieved ${totalPlayers} / 831 (${(
//                     (totalPlayers / 831) *
//                     100
//                 ).toFixed(2)}%)`
//             );
//             break;
//         }

//         if (sleepBeforeQuery) {
//             console.log("Sleeping for 60 seconds...");
//             await new Promise(r => setTimeout(r, 60000));
//             sleepBeforeQuery = false;
//         } else {
//             // Sleep for 0.1 seconds
//             await new Promise(r => setTimeout(r, 100));
//         }
//         // Get info on the Fifa Club World Cup 2022 (league = 1 & season = 2022)
//         const resp = await fetch(
//             `https://v3.football.api-sports.io/players?league=1&season=2022&page=${page}`,
//             {
//                 headers: { "x-apisports-key": process.env.SPORT_API_KEY as string },
//             }
//         );

//         if (resp.headers.get("x-ratelimit-requests-remaining") === "0") {
//             stopBeforeQuery = true;
//             console.log("WARNING: Out of requests for the day.");
//         } else if (resp.headers.get("X-RateLimit-Remaining") === "0") {
//             console.log(
//                 "WARNING: Out of requests for the minute. Will sleep for 60 seconds before next request."
//             );
//             sleepBeforeQuery = true;
//         }

//         if (resp.status !== 200) {
//             console.log(`WARNING: API returned status ${resp.status}.`);
//             console.log(await resp.json());
//             continue;
//         }

//         const json = await resp.json();
//         for (let data of json.response as APIResponse[]) {
//             totalPlayers += 1;
//             const teamName = data.statistics[0].team.name;
//             console.log(`Found ${teamName}'s ${data.player.name} (player #${totalPlayers})`);

//             const playerStats = data.statistics[0];

//             const player: Player = {
//                 name: data.player.name,
//                 dob: data.player.birth.date,
//                 height: data.player.height,
//                 weight: data.player.weight,
//                 injured: data.player.injured,
//                 photo: data.player.photo,
//                 team: playerStats.team.name,
//                 appearances: playerStats.games.appearences,
//                 minutes: playerStats.games.minutes,
//                 captain: playerStats.games.captain,
//                 shotsTotal: playerStats.shots.total || 0,
//                 shotsOnTarget: playerStats.shots.on || 0,
//                 goalsScored: playerStats.goals.total,
//                 assists: playerStats.goals.assists || 0,
//                 attemptedPasses: playerStats.passes.total || 0,
//                 successfulPasses: playerStats.passes.accuracy || 0,
//                 tackles: playerStats.tackles.total || 0,
//                 foulsDrawn: playerStats.fouls.drawn || 0,
//                 foulsCommitted: playerStats.fouls.committed || 0,
//                 yellowCards: playerStats.cards.yellow,
//                 yellowRedCards: playerStats.cards.yellowred,
//                 redCards: playerStats.cards.red,
//                 penaltiesScored: playerStats.penalty.scored || 0,
//             };

//             if (players[teamName] === undefined) {
//                 // Team hasn't been seen before
//                 players[teamName] = [player];
//             } else {
//                 // Team has been seen before
//                 players[teamName].push(player);
//             }
//         }
//     }
//     return players;
// }

// getPlayers().then(players => {
//     fs.writeFile(
//         path.join(__dirname, "../../src/output.json"),
//         JSON.stringify(players, undefined, 4),
//         err => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             console.log("Successfully wrote to output.json");
//         }
//     );
// });
