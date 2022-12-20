import express from "express";
import { teamsRouter } from "./routes";
import {
    fetchAndStorePlayerPhotos,
    fetchNationToIdMapping,
    fetchPlayerNamesAndTeams,
    fetchPlayerToIdMapping,
} from "./api";
import { Nation, Player, PlayerName } from "./api/types";
import * as playerJSON from "./output.json";
console.log(playerJSON);

import fs from "node:fs";
import path from "node:path";

const app = express();
app.use(express.json());

app.use("/teams", teamsRouter);

app.listen(5001, async () => {
    let [nations, nationToPlayerNames] = (await fetchPlayerNamesAndTeams()) as [
        Set<Nation>,
        Record<Nation, PlayerName[]>
    ];
    console.log("Retrieved players and teams from dynamodb...");
    const nationToId = await fetchNationToIdMapping(nations);
    console.log("Retrieved mapping of a nation to its id...");
    const nationToPlayers: Record<Nation, Player[]> = await fetchPlayerToIdMapping(
        nationToId,
        nationToPlayerNames
    );
    console.log("Retrieved mapping of a player to its id...");
    // const nationToPlayers: Record<Nation, Player[]> = playerJSON;

    // const newPlayersJSON: Record<Nation, Player[]> = {};
    // for (let [nation] of Object.keys(nationToPlayers)) {
    //     newPlayersJSON[nation] = [];

    //     console.log(nationToPlayers[nation]);
    //     for (let player of nationToPlayers[nation]) {
    //         let alreadyStored = false;
    //         for (let i = 0; i < newPlayersJSON[nation].length; i++) {
    //             const storedPlayer = newPlayersJSON[nation][i];
    //             if (player.name === storedPlayer.name) {
    //                 newPlayersJSON[nation][i].id = Math.min(player.id, storedPlayer.id);
    //                 alreadyStored = true;
    //                 break;
    //             }
    //         }
    //         if (!alreadyStored) {
    //             newPlayersJSON[nation].push(player);
    //         }
    //     }
    // }

    fs.writeFile(
        path.join(__dirname, "..src/newOutput.json"),
        JSON.stringify(nationToPlayers, undefined, 4),
        err => {
            if (err) {
                console.error(err);
            }
            console.log("Successfully wrote to output.json");
        }
    );

    return;

    console.log("Retrieved mapping of a player to its id...");
    await fetchAndStorePlayerPhotos(nationToPlayers);
    console.log("Stored player photos");

    console.log("Listening on port 5001");
});
