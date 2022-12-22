import { FC } from "react";
import historyIcon from "../../assets/history-icon.png";
import deleteIcon from "../../assets/delete-icon.svg";
import { ISearchResultProps, PageProps } from "../../types";
import "./style.scss";

const SearchResult: FC<PageProps<ISearchResultProps>> = ({ props }): JSX.Element => {
    const handleDeleteResult = () => {
        localStorage.removeItem(props.key);
        props.setFormSubmitCount(props.formSubmitCount + 1);
    };

    return (
        <div className="result-entry-container">
            {props.recentlySearched && <img src={historyIcon} alt="recent search result" />}
            <p className="search-result-content">{props.content}</p>
            {props.recentlySearched && (
                <img
                    src={deleteIcon}
                    className="delete-icon"
                    alt="delete this search result"
                    onClick={handleDeleteResult}
                />
            )}
        </div>
    );
};

export default SearchResult;
