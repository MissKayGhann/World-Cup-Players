interface BirthData {
    date: string;
    place: string;
    country: string;
}

interface PlayerData {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: BirthData;
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
}

interface TeamData {
    id: number;
    name: string;
    logo: string;
}

interface LeagueData {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
    season: number;
}

interface GameData {
    appearences: number; // The API misspells "appearances"
    lineups: number;
    minutes: number;
    number: number | null;
    position: string;
    rating: string | null;
    captain: boolean;
}

interface SubstituteData {
    in: number;
    out: number;
    bench: number;
}

interface ShotData {
    total: number | null;
    on: number | null;
}

interface GoalData {
    total: number;
    conceeded: number | null;
    assists: number | null;
    saves: number | null;
}

interface PassData {
    total: number | null;
    key: number | null;
    accuracy: number | null;
}

interface TackleData {
    total: number | null;
    blocks: number | null;
    interceptions: number | null;
}

interface DuelData {
    total: number | null;
    won: number | null;
}

interface DribbleData {
    attempts: number | null;
    success: number | null;
    past: number | null;
}

interface FoulData {
    drawn: number | null;
    committed: number | null;
}

interface CardData {
    yellow: number;
    yellowred: number;
    red: number;
}

interface PenaltyData {
    won: number | null;
    commited: number | null; // API misspells "committed"
    scored: number | null;
    missed: number | null;
    saved: number | null;
}

interface PlayerStatistics {
    team: TeamData;
    league: LeagueData;
    games: GameData;
    substitutes: SubstituteData;
    shots: ShotData;
    goals: GoalData;
    passes: PassData;
    tackles: TackleData;
    duels: DuelData;
    dribbles: DribbleData;
    fouls: FoulData;
    cards: CardData;
    penalty: PenaltyData;
}

export interface Player {
    // Everything must be string | number.
    name: PlayerData["name"];
    dob: BirthData["date"];
    height: PlayerData["height"];
    weight: PlayerData["weight"];
    injured: PlayerData["injured"];
    photo: PlayerData["photo"];
    team: TeamData["name"];
    appearances: GameData["appearences"]; // The API misspells "appearances"
    minutes: GameData["minutes"];
    captain: GameData["captain"];
    shotsTotal: ShotData["total"] & number; // can't be null
    shotsOnTarget: ShotData["on"] & number; // can't be null
    goalsScored: GoalData["total"];
    assists: GoalData["assists"] & number; // can't be null
    attemptedPasses: PassData["total"] & number; // can't be null
    successfulPasses: PassData["accuracy"] & number; // can't be null
    tackles: TackleData["total"] & number; // can't be null
    foulsDrawn: FoulData["drawn"] & number; // can't be null
    foulsCommitted: FoulData["committed"] & number; // can't be null
    yellowCards: CardData["yellow"];
    yellowRedCards: CardData["yellowred"];
    redCards: CardData["red"];
    penaltiesScored: PenaltyData["scored"] & number; // can't be null
}

export interface APIResponse {
    player: PlayerData;
    statistics: PlayerStatistics[];
}

export type TeamName = TeamData["name"];
