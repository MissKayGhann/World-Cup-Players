import { FC, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { ResultsProps } from "../../types";

const Results: FC<ResultsProps> = ({ props }): JSX.Element => {
    // Change showResults to false to hide recentSearches
    const [showRecents, setShowRecents] = useState<boolean>(false);

    const searchBarProps = {
        ...props,
        results: showRecents,
        setShowRecents: setShowRecents,
        players: props.players,
    };
    return (
        <>
            <SearchBar props={searchBarProps} />
            <div className="results-container"></div>
        </>
    );
};

export default Results;
