import "./style.scss";

const SearchBar = (): JSX.Element => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // preventing form from submitting (that's kinda trippy to read lol)

        // logic for submitting form goes here:
        console.log(e);
    };

    return (
        <>
            <div className="search-div">
                <form className="search-form" onSubmit={e => handleSubmit(e)}>
                    <input type="submit" className="search-img" value="" />
                    <input
                        type="text"
                        placeholder="Press enter key to search"
                        className="search-input"
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
                </form>
            </div>
        </>
    );
};

export default SearchBar;
