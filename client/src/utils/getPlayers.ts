import { PlayerInfo } from "../types";

// To use this function, pass in a nation as a string
// can also pass in a second optional parameter to grab a specific player from that nation
const getPlayersFromNation = async (nation: string, playerName?: string): Promise<PlayerInfo[]> => {
    const res = await fetch(
        `http://localhost:5001/teams/${nation}/players/${playerName ? playerName : ""}`
    );

    const data: PlayerInfo[] = await res.json();
    return data;
};

export default getPlayersFromNation;
