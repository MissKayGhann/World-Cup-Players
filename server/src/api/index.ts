import "isomorphic-fetch";
import {
    APINation,
    Nation,
    NationFromAPI,
    Player,
    PlayerKeysFromDynamoDB,
    PlayerName,
} from "./types";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ddbdClient } from "../lib";

if (process.env.FUT_API_KEY === undefined) {
    throw new Error("Failed to load FUT_API_KEY from .env file");
}

/**
 * Fetches the nations and names of all football players in DynamoDB.
 * @returns The fetched nations, and a mapping of `nation: listOfPlayersForNation`.
 */
export async function fetchPlayerNamesAndTeams() {
    const nations: Set<string> = new Set();
    const nationToPlayers: Record<Nation, PlayerName[]> = {};

    const data = await ddbdClient.send(
        new QueryCommand({
            TableName: "players",
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
            if (nations.has(nation.name)) {
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
    console.log("fetchPlayingToIdMapping", nationToId, nationToPlayerNames);
    return {}; // dummy return value
}

/**
 * Gets the photo of the specified player from the FUT API
 * @param playerId The ID of the player to get the photo of
 */
async function getPlayerPhoto(playerId: number) {
    console.log("getPlayerPhoto", playerId);
}

/**
 * Stores the player's photo in S3 and returns its object URl.
 * @param nation The nation of the player
 * @param player The player's name
 * @param photo The player's photo
 * @returns The stored photo's object URL.
 */
async function storePhotoInS3(nation: string, player: string, photo: any) {
    console.log("storePhotoInS3", nation, player, photo);
    return "the-stored-photo-object-url";
}

/**
 * Stores the provided S3 Object URL of the player's photo in DynamoDB
 * @param nation The nation of the player
 * @param player The player's name
 * @param photo The player's photo
 */
async function storePhotoInDynamoDB(nation: string, player: string, photoURL: string) {
    console.log("storePhotoInDynamoDB", nation, player, photoURL);
}

/**
 * A helper function responsible for calling `storePhotoInS3` and `storePhotoDynamoDB`
 * @param nationId The nation ID of the player's team.
 * @param playerId The ID of the player.
 * @param photo The photo of the player to store in S3 & link to in DynamoDB.
 */
async function storePlayerPhoto(nation: string, player: string, photo: any) {
    console.log("storePlayerPhoto", typeof photo);
    const objectURL = await storePhotoInS3(nation, player, photo);
    await storePhotoInDynamoDB(nation, player, objectURL);
}

/**
 * A helper function responsible for calling `getPlayerPhoto`
 * and `storePlayerPhoto` on all the provided players.
 * @param nationToPlayers A mapping of a nation to its players.
 */
export async function fetchAndStorePlayerPhotos(nationToPlayers: Record<Nation, Player[]>) {
    console.log("fetchAndStorePlayerPhotos", nationToPlayers);

    for (let [nation, players] of Object.entries(nationToPlayers)) {
        for (let player of players) {
            const photo = getPlayerPhoto(player.id);
            storePlayerPhoto(nation, player.name, photo);
        }
    }
}
