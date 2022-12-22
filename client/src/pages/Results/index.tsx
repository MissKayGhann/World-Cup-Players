import { FC, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { IResultsProps, ISearchBarProps, PageProps } from "../../types";

const Results: FC<PageProps<IResultsProps>> = ({ props }): JSX.Element => {
    // Change showRecents to false to hide recentSearches
    const [showRecents, setShowRecents] = useState<boolean>(false);

    const searchBarProps: PageProps<ISearchBarProps> = {
        props: {
            ...props,
            results: showRecents,
            setShowRecents: setShowRecents,
            players: props.players,
        },
    };
    return (
        <>
            <SearchBar props={searchBarProps.props} />
            <div className="results-container"></div>
        </>
    );
};

export default Results;
