import { PlayerInfo } from "../types";
import constants from "./constants";

// To use this function, pass in a nation as a string
// can also pass in a second optional parameter to grab a specific player from that nation
const getPlayersFromNation = async (nation: string, playerName?: string): Promise<PlayerInfo[]> => {
    const res = await fetch(
        `${constants.BASE_URL}teams/${nation}/players/${playerName ? playerName : ""}`
    );

    const data: PlayerInfo[] = await res.json();
    return data;
};

export default getPlayersFromNation;
