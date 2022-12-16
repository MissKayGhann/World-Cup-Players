interface INationInfo {
    nation: string;
    points: number;
    flag: string;
    fifaCode?: string;
    group?: string;
    wins?: number;
    losses?: number;
    draws?: number;
    cleanSheets?: number;
    totalGoalsScored?: number;
    totalGoalsConceived?: number;
    totalRedCards?: number;
    totalYellowCards?: number;
}

type PlayerInfo = {
    manOfMatchCount: number;
    capsForNation: number;
    goalsForNation: number;
    assists: number;
    club: string;
    goals: number;
    yellowCards: number;
    name: string;
    redCards: number;
    shirtNumber: number;
    dob: string;
    team: string;
    position: string;
    photo: string;
};

interface IPlayerProps {
    props: PlayerInfo;
}

export type { INationInfo, IPlayerProps, PlayerInfo };
