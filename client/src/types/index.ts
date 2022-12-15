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
    team: string;
    name: string;
    dob: string;
    photo: string;
    shirtNumber: number;
    position: string;
    goalsScored: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    manOfMatchCount: number;
    capsForNation: number;
    goalsForNation: number;
    club: string;
};

interface IPlayerProps {
    props: PlayerInfo;
}

export type { INationInfo, IPlayerProps };
