import { FC, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { ResultsProps } from "../../types";

const Results: FC<ResultsProps> = ({ props }): JSX.Element => {
    // Change showResults to false to hide recentSearches
    const [showRecents, _] = useState<boolean>(true);

    // const filteredResults = props.nations.filter(n => n.

    const filterResults = () =>  {
        switch (props.query.filterBy) {
            case "goals":
                props.nations.filter(n => n.
                break;
        
            default:
                break;
        }
    }

    const searchBarProps = { ...props, results: !showRecents };
    return (
        <>
            <SearchBar props={searchBarProps} />
            <div className="results-container">
            </div>
        </>
    );
};

export default Results;
