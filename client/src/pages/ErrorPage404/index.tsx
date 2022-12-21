import { FC } from "react";
import SearchBar from "../../components/SearchBar";
import { PageProps, PlayerInfo } from "../../types";
import "./style.scss";

interface IErrorPageProps {
    players: PlayerInfo[];
}

const ErrorPage404: FC<PageProps<IErrorPageProps>> = ({ props }) => {
    return (
        <div className="error-page-container">
            <SearchBar props={props} />
            <h1>404 ERROR: GO BACK NOW – BEFORE IT'S TOO LATE</h1>
        </div>
    );
};

export default ErrorPage404;
