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

type StatsSummaryType = {
    stat: string;
    value: string | number;
};

interface IStatsSummaryProps {
    stat: string;
    value: string | number;
}

interface ISearchResultProps {
    props: {
        content: string;
        recentlySearched?: boolean;
    };
}

type DisplayInfo = IPageProps & {
    props: {
        nations: NationInfo[];
        players: PlayerInfo[];
    };
};

interface IPageProps {
    props: {
        setRoute: React.Dispatch<React.SetStateAction<string>>;
        setQuery: React.Dispatch<React.SetStateAction<Query>>;
    };
}

type Query = {
    query: string;
    filterBy: string;
    min: number;
    max: number;
};

type ResultsProps = DisplayInfo & {
    props: {
        query: Query;
    };
};

export type {
    INationProps,
    NationInfo,
    IPlayerProps,
    PlayerInfo,
    IStatsSummaryProps,
    StatsSummaryType,
    ISearchResultProps,
    IPageProps,
    ResultsProps,
    DisplayInfo,
    Query,
};
