import { useState } from "react";
import SearchBar from "../../components/SearchBar";

const Results = () => {
    const [showResults, _] = useState<boolean>(true);

    return (
        <>
            <SearchBar results={showResults} />
        </>
    );
};

export default Results;
