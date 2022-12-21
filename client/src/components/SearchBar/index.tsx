import "./style.scss";
import React, { useEffect, useRef, useState } from "react";
import SearchResult from "../SearchResult";
import Player from "../Player";
import { ISearchResultProps, SearchBarProps, PlayerInfo, IPlayerProps } from "../../types/";
import homeIcon from "../../assets/home-icon.svg";

const SearchBar = ({ props }: SearchBarProps): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [formSubmitCount, setFormSubmitCount] = useState<number>(0);
    const [filteredResults, setFilteredResults] = useState<PlayerInfo[]>(props.players);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // preventing form from submitting (that's kinda trippy to read lol)
        setFormSubmitCount(formSubmitCount + 1);

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

    const filterResults = (): PlayerInfo[] => {
        if (inputRef.current?.value) {
            const filteredArray: PlayerInfo[] = props.players.filter(value => {
                if (inputRef.current?.value) {
                    return value.name.includes(inputRef.current?.value);
                }
            });
            if (filteredArray) return filteredArray;
        }
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
                        className={"search-img" + (props.results ? " results-border-2" : "")}
                        value=""
                    />
                </form>
                <div
                    className={
                        props.results
                            ? "search-results-container"
                            : "search-results-container hidden"
                    }
                >
                    {Object.keys(localStorage).map((key, index) => {
                        // Looping over localStorage and generating components accordingly
                        let value = localStorage.getItem(key);
                        value = value ? value : "";
                        const searchResultProps: ISearchResultProps = {
                            props: {
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
                <div className="search-results-container">
                    {filteredResults.map(value => {
                        const playerProps: IPlayerProps = {
                            props: {
                                ...value,
                            },
                        };
                        return <Player props={playerProps.props} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default SearchBar;
