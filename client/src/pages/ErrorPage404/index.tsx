import { FC } from "react";
import SearchBar from "../../components/SearchBar";
import { IPageProps } from "../../types";
import "./style.scss";

interface IErrorPageProps extends IPageProps {}

const ErrorPage404: FC<IErrorPageProps> = ({ props }) => {
    return (
        <div className="error-page-container">
            <SearchBar props={props} />
            <h1>404 ERROR: GO BACK NOW – BEFORE IT'S TOO LATE</h1>
        </div>
    );
};

export default ErrorPage404;
