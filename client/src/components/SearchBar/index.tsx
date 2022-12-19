import "./style.scss";
import SearchResult from "../SearchResult";
import { ISearchResultProps } from "../../types/";

interface ISearchBarProps {
    setRoute: React.Dispatch<React.SetStateAction<string>>;
    results?: boolean;
}

const SearchBar = ({ setRoute, results }: ISearchBarProps): JSX.Element => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // add search result to localStorage/cookies
        e.preventDefault(); // preventing form from submitting (that's kinda trippy to read lol)

        setRoute("result");
        console.log("success from me");

        // logic for submitting form goes here:
        console.log(e);
    };

    const searchResultProps: ISearchResultProps = {
        props: {
            content: "This is an interesting sentence",
            recentlySearched: true,
        },
    };

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
                    <SearchResult props={searchResultProps.props} />
                </div>
            </div>
        </>
    );
};

export default SearchBar;
