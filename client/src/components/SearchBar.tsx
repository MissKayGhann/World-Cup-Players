import "../styles/SearchBar.css";



const SearchBar = (): JSX.Element => {
    const handleSearchChange = (e:any) => {
        if (!e.target.value) return
    }
    
    return <>
        <div className="search-div">
            <input 
                className="search-input"
                type="text"
                placeholder="search players"
                onChange={handleSearchChange}
             />
             <input className ="search-btn"type="button" value="" />
        </div>
    </>
    
};

export default SearchBar;
