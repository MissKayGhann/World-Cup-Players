import { FC, useState } from "react";
import SearchBar from "../../components/SearchBar";

interface IResultsProps {
    props: {
        setRoute: React.Dispatch<React.SetStateAction<string>>;
    };
}

const Results: FC<IResultsProps> = ({ props }): JSX.Element => {
    const [showResults, _] = useState<boolean>(true);

    return (
        <>
            <SearchBar setRoute={props.setRoute} results={showResults} />
        </>
    );
};

export default Results;
