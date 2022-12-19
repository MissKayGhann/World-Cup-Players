import { FC } from "react";
import historyIcon from "../../assets/history-icon.png";
import { ISearchResultProps } from "../../types";
import "./style.scss";

const SearchResult: FC<ISearchResultProps> = ({ props }): JSX.Element => {
    return (
        <div className="result-entry-container">
            {props.recentlySearched && <img src={historyIcon} alt="recent search result" />}
            <p>{props.content}</p>
        </div>
    );
};

export default SearchResult;
