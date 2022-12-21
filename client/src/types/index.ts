interface IDefaultProps {
    setRoute: React.Dispatch<React.SetStateAction<string>>;
    setQuery: React.Dispatch<React.SetStateAction<Query>>;
}

type PageProps<Type> = Record<"props", IDefaultProps & Type>;

interface IHomeProps extends DisplayInfo {}

interface IResultsProps {
    query: Query;
    players: PlayerInfo[];
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
    players: PlayerInfo[];
}

interface DisplayInfo {
    nations: NationInfo[];
    players: PlayerInfo[];
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

type Query = {
    query: string;
    filterBy?: string;
    min?: number;
    max?: number;
};

export type {
    IDefaultProps,
    INationProps,
    NationInfo,
    IPlayerProps,
    PlayerInfo,
    IStatsSummaryProps,
    StatsSummaryType,
    Query,
    PageProps,
    IHomeProps,
    IResultsProps,
    ISearchResultProps,
    ISearchBarProps,
    DisplayInfo,
};
