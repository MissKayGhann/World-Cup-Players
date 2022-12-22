interface IDefaultProps {
    route: string;
    setRoute: React.Dispatch<React.SetStateAction<string>>;
    setQuery: React.Dispatch<React.SetStateAction<Query>>;
}

type PageProps<Type> = Record<"props", IDefaultProps & Type>;

interface IHomeProps extends DisplayInfo {
    query: Query;
}

interface IResultsProps {
    query: Query;
    players: IPlayerInfo[];
}

interface ISearchResultProps {
    content: string;
    recentlySearched?: boolean;
    key: string;
    formSubmitCount: number;
    setFormSubmitCount: React.Dispatch<React.SetStateAction<number>>;
}

interface ISearchBarProps {
    results?: boolean;
    setShowRecents?: React.Dispatch<React.SetStateAction<boolean>>;
    players: IPlayerInfo[];
    query: Query;
}

interface DisplayInfo {
    nations: NationInfo[];
    players: IPlayerInfo[];
}

type NationInfo = {
    nation: string;
    fifaCode: string;
    draws: number;
    totalGoalsScored: number;
    losses: number;
    flag: string;
    cleanSheets: number;
    points: number;
    totalGoalsConceived: number;
    totalRedCards: number;
    totalYellowCards: number;
    wins: number;
};

interface INationProps {
    props: NationInfo;
}

// type PlayerInfo = {
//     manOfMatchCount?: number;
//     capsForNation?: number;
//     goalsForNation?: number;
//     assists: number;
//     club?: string;
//     goals: number;
//     yellowCards: number;
//     name: string;
//     redCards: number;
//     shirtNumber?: number;
//     dob: string;
//     team: string;
//     position?: string;
//     photo?: string;
// };

interface IPlayerInfo {
    // Everything must be string | number.
    name: string;
    dob: string;
    height?: string;
    weight?: string;
    photo?: string;
    team: string;
    position: string;
    club: string;

    // above is strings
    // below is numbers

    appearances?: number; // the api misspells "appearances" as "appearences"
    minutes?: number;
    shotsTotal?: number;
    shotsOnTarget?: number;
    goals: number;
    assists: number;
    attemptedPasses?: number;
    successfulPasses?: number;
    tackles?: number;
    foulsDrawn?: number;
    foulsCommitted?: number;
    yellowCards: number;
    yellowRedCards?: number;
    redCards: number;
    penaltiesScored?: number;
    manOfMatchCount: number;
    goalsForNation: number;
    shirtNumber: number;
    capsForNation: number;
}

interface IPlayerProps {
    props: IPlayerInfo;
}

type StatsSummaryType = {
    stat: string;
    value: string | number;
};

interface IStatsSummaryProps {
    stat: string;
    value: string | number;
}

type Query = {
    query: string;
    filterBy: FilterBy;
    min: number;
    max: number;
};

type FilterBy =
    | ""
    | "goals"
    | "assists"
    | "yellowCards"
    | "redCards"
    | "manOfMatchCount"
    | "capsForNation"
    | "goalsForNation";

export type {
    IDefaultProps,
    INationProps,
    NationInfo,
    IPlayerProps,
    IPlayerInfo as PlayerInfo,
    IStatsSummaryProps,
    StatsSummaryType,
    Query,
    PageProps,
    IHomeProps,
    IResultsProps,
    ISearchResultProps,
    ISearchBarProps,
    DisplayInfo,
    FilterBy,
};
