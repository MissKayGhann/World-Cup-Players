import "./style.scss";
import React, { useEffect, useRef, useState, FC } from "react";
import SearchResult from "../SearchResult";
import Player from "../Player";
import {
    ISearchResultProps,
    ISearchBarProps,
    PlayerInfo,
    IPlayerProps,
    PageProps,
    Query,
    // FilterBy,
} from "../../types/";
import homeIcon from "../../assets/home-icon.svg";
import githubIcon from "../../assets/github-icon.svg";

const SearchBar: FC<PageProps<ISearchBarProps>> = ({ props }): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [formSubmitCount, setFormSubmitCount] = useState<number>(0);
    const [filteredResults, setFilteredResults] = useState<PlayerInfo[]>(props.players);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // preventing form from submitting (that's kinda trippy to read lol)
        setFormSubmitCount(formSubmitCount + 1);
        if (props.setShowRecents) props.setShowRecents(false);
        let filtered = filterResults(props.query);
        setFilteredResults(filtered);

        // making sure the input is not empty before submit
        if (inputRef.current?.value && localStorage.length < 5) {
            localStorage.setItem(localStorage.length.toString(), inputRef.current?.value);
        } else if (inputRef.current?.value) {
            localStorage.removeItem((localStorage.length - 1).toString());
            localStorage.setItem(localStorage.length.toString(), inputRef.current?.value);
        }
        props.setRoute("results"); // moving to results page

        // logic for submitting form goes here:
        // console.log(e);
    };

    const handleInputClick = () => {
        if (props.setShowRecents && !props.results) {
            props.setShowRecents(true);
        } else if (props.setShowRecents) {
            props.setShowRecents(false);
        }
    };

    const handleInputChange = () => {
        if (props.setShowRecents) {
            props.setShowRecents(false);
            let filtered = filterResults();
            setFilteredResults(filtered);
        }
    };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const theQuery: Query = {
            query: props.query.query,
            filterBy: props.query.filterBy,
            min: Number(e.target.value),
            max: props.query.max,
        };

        props.setQuery(theQuery);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const theQuery: Query = {
            query: props.query.query,
            filterBy: props.query.filterBy,
            min: props.query.min,
            max: Number(e.target.value),
        };
        props.setQuery(theQuery);
    };

    const handleDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let theQuery: Query = props.query;
        if (
            e.target.value === "" ||
            e.target.value === "goals" ||
            e.target.value === "assists" ||
            e.target.value === "yellowCards" ||
            e.target.value === "redCards" ||
            e.target.value === "manOfMatchCount" ||
            e.target.value === "capsForNation" ||
            e.target.value === "goalsForNation"
        ) {
            theQuery = {
                query: props.query.query,
                filterBy: e.target.value,
                min: props.query.min,
                max: props.query.max,
            };
        }

        props.setQuery(theQuery);
    };

    const filterResults = (query?: Query): PlayerInfo[] => {
        let filteredArray: PlayerInfo[] = props.players;
        let stat: number;

        // if statement is for filtering by stat, else is for filtering by name
        if (query?.filterBy && query?.min && query?.max) {
            filteredArray = filteredArray.filter(value => {
                if (query.filterBy)
                    stat = Number(value[query.filterBy]) ? Number(value[query.filterBy]) : 0;
                if (
                    stat >= query.min &&
                    stat <= query.max &&
                    value.name.toLowerCase().includes(inputRef.current?.value.toLowerCase() || "")
                )
                    return value;
            });
        } else {
            if (inputRef.current?.value) {
                filteredArray = filteredArray.filter(value => {
                    return value.name
                        .toLowerCase()
                        .includes(inputRef.current?.value.toLowerCase() || "");
                });
            }
        }

        return filteredArray;
    };

    useEffect(() => {}, [formSubmitCount, props.results, filterResults]);

    return (
        <>
            <div className="search-div">
                <button className="home-btn" onClick={() => props.setRoute("home")}>
                    <img src={homeIcon} alt="home" />
                </button>
                <form className="search-form" onSubmit={e => handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder="Press enter key to search"
                        className={"search-input" + (props.results ? " results-border" : "")}
                        ref={inputRef}
                        onClick={handleInputClick}
                        onChange={handleInputChange}
                    />

                    <select
                        name="filter-search"
                        id="search-dropdown"
                        defaultValue="filterBy"
                        onChange={e => handleDropDownChange(e)}
                    >
                        <option value="">Filter by:</option>
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
                        onChange={e => handleMinChange(e)}
                        min={0}
                    />
                    <input
                        type="number"
                        name="max"
                        className="min-max-input"
                        placeholder="max"
                        onChange={e => handleMaxChange(e)}
                        min={1}
                    />
                    <input
                        type="submit"
                        className={"search-img" + (props.results ? " results-border-2" : "")}
                        value=""
                    />
                </form>

                <button className="home-btn github-btn">
                    <a href="https://github.com/MissKayGhann/World-Cup-Players/" target="_blank">
                        <img src={githubIcon} alt="Click to go to our github repository" />
                    </a>
                </button>

                <div
                    className={
                        props.results
                            ? "search-results-container z-index"
                            : "search-results-container z-index hidden"
                    }
                >
                    {Object.keys(localStorage).map((key, index) => {
                        // Looping over localStorage and generating components accordingly
                        let value = localStorage.getItem(key);
                        value = value ? value : "";
                        const searchResultProps: PageProps<ISearchResultProps> = {
                            props: {
                                route: props.route,
                                setRoute: props.setRoute,
                                setQuery: props.setQuery,
                                content: value,
                                recentlySearched: true,
                                key: key,
                                formSubmitCount: formSubmitCount,
                                setFormSubmitCount: setFormSubmitCount,
                            },
                        };
                        return <SearchResult props={searchResultProps.props} key={index} />;
                    })}
                </div>
                <div className="search-results-container filtered-results">
                    {props.route === "results"
                        ? filteredResults.map((value, index) => {
                              const playerProps: IPlayerProps = {
                                  props: {
                                      ...value,
                                  },
                              };
                              return <Player props={playerProps.props} key={index} />;
                          })
                        : ""}
                </div>
            </div>
        </>
    );
};

export default SearchBar;
