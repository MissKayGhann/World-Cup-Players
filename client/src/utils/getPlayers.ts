import { NationInfo, PlayerInfo } from "../types";
import constants from "./constants";
import getNations from "./getNations";

// To use this function, pass in a nation as a string
// can also pass in a second optional parameter to grab a specific player from that nation
const getPlayersFromNation = async (
    nation?: string,
    playerName?: string
): Promise<PlayerInfo[]> => {
    // can get nations endpoint
    let requestURL = ``;
    let playersArray: PlayerInfo[] = [];

    if (nation) {
        requestURL = `${constants.BASE_URL}teams/${nation}/players/${playerName ? playerName : ""}`;
    } else {
        // loop over each nation, then query all the players from that nation
        // next, add these players to an array that will contain ALL players
        const nations: NationInfo[] = await getNations();

        nations.forEach(value => {
            requestURL = `${constants.BASE_URL}teams/${value.nation}/players`;
            fetch(requestURL)
                .then(response => response.json())
                .then(data => {
                    playersArray.push(data);
                });
        });

        return playersArray;
    }

    const res = await fetch(requestURL);

    const data: PlayerInfo[] = await res.json();
    return data;
};

export default getPlayersFromNation;
