interface PaginationInfo {
    countCurrent: number;
    countTotal: number;
    pageCurrent: number;
    pageTotal: number;
    itemsPerPage: number;
}

export interface PlayerKeysFromDynamoDB {
    team: string;
    name: string;
}

export type Nation = PlayerKeysFromDynamoDB["team"];
export type PlayerName = PlayerKeysFromDynamoDB["name"];
export interface Player {
    name: PlayerName;
    id: number;
}

export interface NationFromAPI {
    id: number;
    name: Nation;
}

export interface APINation {
    pagination: PaginationInfo;
    items: NationFromAPI[];
}

export interface PlayerFromAPI {
    name: string
    id: number
    nation: number
}

export interface APIPlayer {
    pagination: PaginationInfo;
    items: (Record<string, any> & PlayerFromAPI)[]
}
