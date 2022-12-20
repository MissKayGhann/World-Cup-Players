import "./style.scss";
import { useEffect, useRef, useState } from "react";
import SearchResult from "../SearchResult";
import { ISearchResultProps } from "../../types/";

interface ISearchBarProps {
    setRoute: React.Dispatch<React.SetStateAction<string>>;
    results?: boolean;
}

const SearchBar = ({ setRoute, results }: ISearchBarProps): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [formSubmitCount, setFormSubmitCount] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // preventing form from submitting (that's kinda trippy to read lol)
        setFormSubmitCount(formSubmitCount + 1);

        // making sure the input is not empty before submit
        if (inputRef.current?.value && localStorage.length < 5) {
            localStorage.setItem(localStorage.length.toString(), inputRef.current?.value);
        }
        setRoute("results"); // moving to results page

        // logic for submitting form goes here:
        // console.log(e);
    };

    useEffect(() => {}, [formSubmitCount]);

    return (
        <>
            <button className="home-btn" onClick={() => setRoute("home")}>
                HOME
            </button>
            <div className="search-div">
                <form className="search-form" onSubmit={e => handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder="Press enter key to search"
                        className={"search-input" + (results ? " results-border" : "")}
                        ref={inputRef}
                    />

                    <select name="filter-search" id="search-dropdown" defaultValue="filterBy">
                        <option value="filterBy" disabled>
                            Filter by:
                        </option>
                        <option value="goals">Goals</option>
                        <option value="assists">Assists</option>
                        <option value="yellowCards">Yellow cards</option>
                        <option value="redCards">Red cards</option>
                        <option value="manOfMatchCount">Man of the match awards</option>
                        <option value="capsForNation">International appearances</option>
                        <option value="goalsForNation">Total goals for nation</option>
                    </select>

                    <input
                        type="number"
                        name="min"
                        className="min-max-input"
                        placeholder="min"
                        min={1}
                    />
                    <input
                        type="number"
                        name="max"
                        className="min-max-input"
                        placeholder="max"
                        min={1}
                    />
                    <input
                        type="submit"
                        className={"search-img" + (results ? " results-border-2" : "")}
                        value=""
                    />
                </form>
                <div
                    className={
                        results ? "search-results-container" : "search-results-container hidden"
                    }
                >
                    {Object.keys(localStorage).map((key, index) => {
                        // Looping over localStorage and generating components accordingly
                        let value = localStorage.getItem(key);
                        value = value ? value : "";
                        const searchResultProps: ISearchResultProps = {
                            props: { content: value, recentlySearched: true },
                        };
                        return <SearchResult props={searchResultProps.props} key={index} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default SearchBar;
