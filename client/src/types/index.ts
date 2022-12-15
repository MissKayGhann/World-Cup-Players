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

export type { INationInfo };
