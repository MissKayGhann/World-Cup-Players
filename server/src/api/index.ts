import "isomorphic-fetch";
import {
    APINation,
    APIPlayer,
    Nation,
    NationFromAPI,
    Player,
    PlayerKeysFromDynamoDB,
    PlayerName,
} from "./types";
import * as stream from "node:stream";
import { ddbdClient } from "../lib";
import { ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import { ReadableStream } from "node:stream/web";
import { Upload } from "@aws-sdk/lib-storage";

if (process.env.FUT_API_KEY === undefined) {
    throw new Error("Failed to load FUT_API_KEY from .env file");
}

const client = new S3Client({
    region: "eu-west-2",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID || "",
        secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
    },
});

/**
 * Fetches the nations and names of all football players in DynamoDB.
 * @returns The fetched nations, and a mapping of `nation: listOfPlayersForNation`.
 */
export async function fetchPlayerNamesAndTeams() {
    const nations: Set<string> = new Set();
    const nationToPlayers: Record<Nation, PlayerName[]> = {};

    const data = await ddbdClient.send(
        new ScanCommand({
            TableName: "Players",
            ProjectionExpression: "team, #N",
            ExpressionAttributeNames: { "#N": "name" },
        })
    );
    for (let player of data.Items as PlayerKeysFromDynamoDB[]) {
        nations.add(player.team);
        if (nationToPlayers[player.team] === undefined) {
            // This nation hasn't been seen yet
            nationToPlayers[player.team] = [player.name];
        } else {
            // This nation has been seen
            nationToPlayers[player.team].push(player.name);
        }
    }
    return [nations, nationToPlayers];
}

/**
 * Builds a mapping of `nationName: nationId` for all provided nations.
 * @param nations The nations to get the corresponding ID of.
 * @returns A mapping of `nation: nationId`.
 */
export async function fetchNationToIdMapping(nations: Set<string>) {
    const nationToId: Record<Nation, NationFromAPI["id"]> = {};
    let page = 1;
    let maxPage = 1; // temp value until we know the actual value
    let nationsFound = 0;

    // Keep making API requests to the next page until either
    // - we run out of pages (raises an error)
    // - we have the nation IDs that we need (will then return them)
    while (nationsFound !== nations.size) {
        if (page > maxPage) {
            // This *should* never happen, but we handle it just in case
            throw new Error(`Exceeded page limit of ${maxPage} when trying to find nations`);
        }

        // Get the next page of nations from the API
        const resp = await fetch(`https://futdb.app/api/nations?page=${page}`, {
            headers: { "X-AUTH-TOKEN": process.env.FUT_API_KEY as string },
        });
        const json: APINation = await resp.json();

        if (page === 1) {
            // First request, so set `maxPage` to the actual value
            maxPage = json.pagination.pageTotal;
        }

        // Loop over the returned nations, and see whether
        // each nation is a nation that we need to store the ID of
        for (let nation of json.items as NationFromAPI[]) {
            if (nationToId[nation.name] !== undefined) continue; // we've already stored the id of this nation

            // The API uses "Korea Republic" instead of "South Korea"
            if (nations.has(nation.name === "Korea Republic" ? "South Korea" : nation.name)) {
                // This is a nation that we need the id of
                nationToId[nation.name] = nation.id;
                nationsFound++;
            }
        }
        page++;
    }
    return nationToId;
}

/**
 * Creates a new list of objects that maps player in `nationToPlayerNames`,
 * to the structure of `{name: playerName, id: playerId`}, and returns it.
 * @param nationToId A mapping of each nation to its ID.
 * @param nationToPlayerNames A mapping of each nation to its players' names.
 */
export async function fetchPlayerToIdMapping(
    nationToId: Record<Nation, number>,
    nationToPlayerNames: Record<Nation, PlayerName[]>
) {
    let nationToPlayers: Record<Nation, Player[]> = {};

    let page = 1;
    let maxPage = 1;
    let playersFound = 0;

    // Keep making API requests to the next page until either
    // - we run out of pages (raises an error)
    // - we have all 831 player IDs that we need (will then return them)
    while (playersFound !== 831) {
        if (page % 20 === 0) console.log(`Found ${playersFound} players before page ${page}.`);
        if (page > maxPage) {
            // This *should* never happen, but we handle it just in case
            const missingPlayers: Record<Nation, Player["name"][]> = {};
            for (let nation of Object.keys(nationToPlayerNames)) {
                if (nationToPlayers[nation] === undefined) {
                    missingPlayers[nation] = nationToPlayerNames[nation];
                    continue;
                }

                for (let playerName of nationToPlayerNames[nation]) {
                    let playerHasBeenRetrieved = false;
                    for (let retrievedPlayer of nationToPlayers[nation]) {
                        if (retrievedPlayer.name === playerName) {
                            playerHasBeenRetrieved = true;
                            break;
                        }
                    }
                    if (!playerHasBeenRetrieved) {
                        if (missingPlayers[nation] === undefined)
                            missingPlayers[nation] = [playerName];
                        else missingPlayers[nation].push(playerName);
                    }
                }
            }
            throw new Error(
                `Exceeded page limit of ${maxPage} when trying to find players. ` +
                    `Found ${playersFound} / 831 players and are missing the following players:\n${JSON.stringify(
                        missingPlayers,
                        undefined,
                        4
                    )}`
            );
        }

        const resp = await fetch(`https://futdb.app/api/players?page=${page}`, {
            headers: { "X-AUTH-TOKEN": process.env.FUT_API_KEY as string },
        });
        const json: APIPlayer = await resp.json();

        if (page === 1) {
            // First request, so set `maxPage` to the actual value
            maxPage = json.pagination.pageTotal;
        }

        for (let player of json.items) {
            for (let [nation, nationId] of Object.entries(nationToId)) {
                if (player.nation === nationId) {
                    // Player belongs to this nation's team
                    for (let storedPlayerName of nationToPlayerNames[
                        // The API uses "Korea Republic" instead of "South Korea"
                        nation === "Korea Republic" ? "South Korea" : nation
                    ]) {
                        if (storedPlayerName === player.name) {
                            // We need this player's id
                            let playerSeenBefore = false;

                            if (nationToPlayers[nation] === undefined) {
                                // Nation hasn't been seen
                                nationToPlayers[nation] = [{ name: player.name, id: player.id }];
                            } else {
                                // The nation has been seen, so check if the player has been seen
                                for (let i = 0; i < nationToPlayers[nation].length; i++) {
                                    const seenPlayer = nationToPlayers[nation][i];
                                    if (seenPlayer.name === player.name) {
                                        // Player has been seen before, so set the id to the lower of the two.
                                        // This needs to be done because the API may have the same player multiple
                                        // times, e.g. a rare and hero version of the player. We want the player with
                                        // the lowest id, as that's the "base" player (the non-special player).
                                        console.log(
                                            `Refound ${nation}'s ${player.name}. ` +
                                                "Setting the id to the lower of: " +
                                                `${player.id} (new) and (${seenPlayer.id}) (old)`
                                        );
                                        nationToPlayers[nation][i].id = Math.min(
                                            seenPlayer.id,
                                            player.id
                                        );
                                        playerSeenBefore = true;
                                        break;
                                    }
                                }
                                if (!playerSeenBefore)
                                    nationToPlayers[nation].push({
                                        name: player.name,
                                        id: player.id,
                                    });
                            }
                            if (!playerSeenBefore) playersFound++;
                        }
                    }
                }
            }
        }
        page++;
    }
    return nationToPlayers;
}

/**
 * Gets the photo of the specified player from the FUT API.
 * @param playerId The ID of the player to get the photo of.
 */
async function getPlayerPhoto(playerId: number) {
    const resp = await fetch(`https://futdb.app/api/players/${playerId}/image`);
    return resp.body;
}

/**
 * Stores the player's photo in S3 and returns its object URl.
 * @param nation The nation of the player.
 * @param player The player object for the player whos photo is being stored.
 * @param photoStream A stream containing the player's photo.
 * @returns Info on the uploaded photo.
 */
async function storePhotoInS3(nation: string, player: Player, photoStream: stream.Readable) {
    const upload = new Upload({
        client: client,
        params: {
            Bucket: "worldcupimages",
            Key: `players/${nation.replace(" ", "_")}/${player.name.replace(" ", "_")}.png`,
            Body: photoStream,
        },
    });

    upload.on("httpUploadProgress", progress => {
        console.log(
            `Loaded part ${progress.part} of ${nation}'s ${player.name} (id: ${player.id})`
        );
    });

    return await upload.done();
}

/**
 * Stores the provided S3 Object URL of the player's photo in DynamoDB.
 * @param nation The nation of the player.
 * @param player The player object for the player whos photo is being stored.
 * @param photoUrl A url pointing to the player's photo.
 */
async function storePhotoInDynamoDB(nation: string, player: Player, photoURL: string) {
    console.log("storePhotoInDynamoDB", nation, player, photoURL);
    return await ddbdClient.send(
        new UpdateCommand({
            TableName: "Players",
            Key: {
                team: nation,
                name: player.name,
            },
            UpdateExpression: "SET photo = :photoUrl",
            ExpressionAttributeValues: {
                ":photoUrl": photoURL,
            },
        })
    );
}

/**
 * A helper function responsible for calling `storePhotoInS3` and `storePhotoInDynamoDB`.
 * @param nationId The nation ID of the player's team.
 * @param playerId The ID of the player.
 * @param photo The photo of the player to store in S3 & link to in DynamoDB.
 */
async function storePlayerPhoto(nation: string, player: Player, photoStream: stream.Readable) {
    const s3Response = await storePhotoInS3(nation, player, photoStream);

    // if (!isCompleteMultipartUploadCommandOutput(s3Response)) {
    //     throw new Error(
    //         `Failed to upload photo of ${nation}'s ${player.name} (id: ${player.id}) to s3.`
    //     );
    // }

    if (!("Location" in s3Response) || s3Response.Location === undefined) {
        // Upload to s3 was unsuccessful or the `Location` field is `undefined`.
        throw new Error(
            `Location of the s3 object for ${nation}'s ${player.name} (id: ${player.id}) was undefined.`
        );
    }
    // Upload to s3 was successful, *and* we have the url of the uploaded photo.
    return storePhotoInDynamoDB(nation, player, s3Response.Location);
}

/**
 * A helper function responsible for calling `getPlayerPhoto`
 * and `storePlayerPhoto` on all the provided players.
 * @param nationToPlayers A mapping of a nation to its players.
 */
export async function fetchAndStorePlayerPhotos(nationToPlayers: Record<Nation, Player[]>) {
    for (let [nation, players] of Object.entries(nationToPlayers)) {
        const promises = players.map(async player => {
            const photoStream = stream.Readable.from(
                (await getPlayerPhoto(player.id)) as ReadableStream<any>
            );

            return storePlayerPhoto(nation, player, photoStream);
        });

        let failed = 0;
        const results = await Promise.allSettled(promises);
        for (let result of results) {
            if (result.status === "rejected") {
                // Photo failed to upload to s3 or dynamodb
                console.log(result.reason);
                failed++;
            } else {
                // Photo suceeded in being uploaded
                console.log(result.value);
            }
        }
        console.log(
            `${players.length - failed}/${players.length} suceeded (${(
                (1 - failed / players.length) *
                100
            ).toFixed(2)}%)`
        );

        break; // only do the first team's players
    }
}
